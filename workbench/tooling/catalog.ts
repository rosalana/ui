import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { parse } from "@vue/compiler-sfc";
import type { Plugin } from "vite";

/** Read the public barrels rather than maintaining a second list of the library. */
export function documentationCatalog(root: string): Plugin {
  const id = "virtual:workbench-catalog";
  function build() {
    const virtual = new Map<string, string>();
    const walk = (dir: string): string[] =>
      fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory()
            ? walk(path.join(dir, e.name))
            : [path.join(dir, e.name)],
        );
    for (const file of walk(path.join(root, "src")).filter((f) =>
      f.endsWith(".vue"),
    )) {
      const { descriptor } = parse(fs.readFileSync(file, "utf8"));
      virtual.set(
        file + ".ts",
        (descriptor.script?.content ?? "") +
          "\n" +
          (descriptor.scriptSetup?.content ?? "") +
          "\nexport {};",
      );
    }
    const normalizedVirtual = new Map(
      [...virtual].map(([file, code]) => [file.toLowerCase(), code]),
    );
    const options: ts.CompilerOptions = {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      skipLibCheck: true,
      strict: true,
      allowImportingTsExtensions: true,
    };
    const host = ts.createCompilerHost(options);
    const originalRead = host.readFile.bind(host),
      originalExists = host.fileExists.bind(host);
    host.readFile = (f) =>
      virtual.get(f) ??
      normalizedVirtual.get(f.toLowerCase()) ??
      originalRead(f);
    host.fileExists = (f) =>
      virtual.has(f) ||
      normalizedVirtual.has(f.toLowerCase()) ||
      originalExists(f);
    const entries = [
      "src/index.ts",
      "src/helpers/index.ts",
      "src/local/index.ts",
    ].map((f) => path.join(root, f));
    const program = ts.createProgram(
      [...entries, ...virtual.keys()],
      options,
      host,
    );
    const checker = program.getTypeChecker();
    const flags = ts.TypeFormatFlags.NoTruncation;
    const typeText = (type: ts.Type) =>
      checker.typeToString(type, undefined, flags);
    const docs = (symbol: ts.Symbol) =>
      ts.displayPartsToString(symbol.getDocumentationComment(checker));
    function properties(type: ts.Type) {
      return checker.getPropertiesOfType(type).map((symbol) => {
        const decl = symbol.valueDeclaration ?? symbol.declarations?.[0];
        return {
          name: symbol.name,
          type: decl
            ? typeText(checker.getTypeOfSymbolAtLocation(symbol, decl))
            : "unknown",
          optional: !!(symbol.flags & ts.SymbolFlags.Optional),
          description: docs(symbol),
        };
      });
    }
    function component(name: string, relative: string) {
      // Some barrels use `blocks` while the directory is `Blocks` (macOS is case insensitive).
      const file = path.join(
        root,
        "src/components",
        relative.replace(/^\.\//, ""),
      );
      const raw = fs.readFileSync(file, "utf8");
      const source =
        program.getSourceFile(file + ".ts") ??
        program
          .getSourceFiles()
          .find(
            (source) =>
              source.fileName.toLowerCase() === (file + ".ts").toLowerCase(),
          )!;
      let props: ReturnType<typeof properties> = [],
        events: ReturnType<typeof properties> = [];
      let exposed: ReturnType<typeof properties> = [];
      let slotProps: ReturnType<typeof properties> = [];
      const models: { name: string; type: string }[] = [];
      const defaults: Record<string, string> = {};
      const variants: Record<string, string[]> = {};
      function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
          const call = node.expression.getText(source);
          if (
            ["defineProps", "defineEmits"].includes(call) &&
            node.typeArguments?.[0]
          ) {
            const type = checker.getTypeFromTypeNode(node.typeArguments[0]);
            if (call === "defineProps") props = properties(type);
            else {
              events = properties(type);
              for (const signature of type.getCallSignatures()) {
                const first = signature.parameters[0];
                if (first)
                  events.push({
                    name: typeText(
                      checker.getTypeOfSymbolAtLocation(
                        first,
                        first.valueDeclaration!,
                      ),
                    ),
                    type: checker.signatureToString(
                      signature,
                      undefined,
                      flags,
                    ),
                    optional: false,
                    description: "",
                  });
              }
            }
          }
          if (
            call === "defineEmits" &&
            node.arguments[0] &&
            ts.isArrayLiteralExpression(node.arguments[0])
          ) {
            events = node.arguments[0].elements
              .filter(ts.isStringLiteral)
              .map((event) => ({
                name: event.text,
                type: "(...args: unknown[]) => void",
                optional: false,
                description:
                  "Runtime event declaration; payload is not statically typed.",
              }));
          }
          if (call === "defineExpose" && node.arguments[0])
            exposed = properties(checker.getTypeAtLocation(node.arguments[0]));
          if (call === "defineSlots" && node.typeArguments?.[0])
            slotProps = properties(
              checker.getTypeFromTypeNode(node.typeArguments[0]),
            );
          if (call === "defineModel")
            models.push({
              name:
                node.arguments[0] && ts.isStringLiteral(node.arguments[0])
                  ? node.arguments[0].text
                  : "modelValue",
              type: node.typeArguments?.[0]?.getText(source) ?? "unknown",
            });
          if (
            call === "withDefaults" &&
            node.arguments[1] &&
            ts.isObjectLiteralExpression(node.arguments[1])
          ) {
            for (const prop of node.arguments[1].properties)
              if (ts.isPropertyAssignment(prop))
                defaults[prop.name.getText(source).replace(/['"]/g, "")] =
                  prop.initializer.getText(source);
          }
        }
        if (
          ts.isPropertyAssignment(node) &&
          node.name.getText(source) === "variants" &&
          ts.isObjectLiteralExpression(node.initializer)
        ) {
          for (const variant of node.initializer.properties)
            if (
              ts.isPropertyAssignment(variant) &&
              ts.isObjectLiteralExpression(variant.initializer)
            )
              variants[variant.name.getText(source)] =
                variant.initializer.properties.map(
                  (p) => p.name?.getText(source).replace(/['"]/g, "") ?? "",
                );
        }
        if (
          ts.isPropertyAssignment(node) &&
          node.name.getText(source) === "defaultVariants" &&
          ts.isObjectLiteralExpression(node.initializer)
        ) {
          for (const prop of node.initializer.properties)
            if (ts.isPropertyAssignment(prop)) {
              const key = prop.name.getText(source).replace(/['"]/g, "");
              defaults[key] ??= prop.initializer.getText(source);
            }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      const slots = [
        ...new Set(
          [...raw.matchAll(/<slot\b([^>]*?)\/?\s*>/g)].map(
            (m) => /\bname="([^"]+)"/.exec(m[1])?.[1] ?? "default",
          ),
        ),
      ];
      const group = relative.split("/")[2];
      return {
        name,
        group,
        kind: relative.toLowerCase().includes("/blocks/")
          ? "block"
          : "component",
        file: path.relative(root, file),
        props: props.map((p) => ({ ...p, default: defaults[p.name] })),
        events,
        models,
        slots,
        slotProps,
        exposed,
        variants: Object.fromEntries(
          Object.entries(variants).flatMap(([name, values]) => {
            const prop = props.find((prop) => prop.name === name);
            if (!prop) return [];
            const publicValues = prop.type.includes('"')
              ? values.filter((value) =>
                  prop.type.includes(JSON.stringify(value)),
                )
              : values;
            return publicValues.length ? [[name, publicValues]] : [];
          }),
        ),
      };
    }
    const barrel = fs.readFileSync(
      path.join(root, "src/components/index.ts"),
      "utf8",
    );
    const components = [
      ...barrel.matchAll(/export \{ default as (\w+) \} from "([^"]+\.vue)"/g),
    ].map((m) => component(m[1], m[2]));
    // TextEffect exports a namespace of components rather than a single SFC.
    const textEffects = fs.readFileSync(
      path.join(root, "src/components/blocks/TextEffect/index.ts"),
      "utf8",
    );
    for (const match of textEffects.matchAll(
      /import (\w+) from "\.\/([^"/]+\.vue)"/g,
    ))
      components.push(
        component(`TextEffect.${match[1]}`, `./blocks/TextEffect/${match[2]}`),
      );
    const symbols: {
      name: string;
      kind: string;
      file: string;
      description: string;
      declaration: string;
      entry: string;
    }[] = [];
    for (const entry of entries) {
      const source = program.getSourceFile(entry)!;
      const module = checker.getSymbolAtLocation(source)!;
      for (const exported of checker.getExportsOfModule(module)) {
        const symbol =
          exported.flags & ts.SymbolFlags.Alias
            ? checker.getAliasedSymbol(exported)
            : exported;
        const decls = symbol.declarations ?? [];
        const decl = symbol.valueDeclaration ?? decls[0];
        if (!decl || decl.getSourceFile().fileName.endsWith(".vue.ts"))
          continue;
        const file = path.relative(root, decl.getSourceFile().fileName);
        if (
          file.includes("components/") &&
          !file.endsWith("types.ts") &&
          !file.endsWith("context.ts") &&
          !file.endsWith("value.ts")
        )
          continue;
        const kind =
          symbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias)
            ? "type"
            : "value";
        let declaration = decl.getText();
        if (ts.isFunctionDeclaration(decl)) {
          declaration = checker
            .getTypeOfSymbolAtLocation(symbol, decl)
            .getCallSignatures()
            .map(
              (s) =>
                `function ${exported.name}${checker.signatureToString(s, undefined, flags)};`,
            )
            .join("\n");
        } else if (ts.isVariableDeclaration(decl))
          declaration = `const ${exported.name}: ${typeText(checker.getTypeOfSymbolAtLocation(symbol, decl))};`;
        symbols.push({
          name: exported.name,
          kind,
          file,
          description: docs(symbol),
          declaration,
          entry: entry.includes("/helpers/")
            ? "@rosalana/ui/helpers"
            : entry.includes("/local/")
              ? "@rosalana/ui/local"
              : "@rosalana/ui",
        });
      }
    }
    return { components, symbols };
  }
  let cached: ReturnType<typeof build> | undefined;
  return {
    name: "workbench-documentation",
    resolveId(source) {
      if (source === id) return "\0" + id;
    },
    load(source) {
      if (source === "\0" + id)
        return `export default ${JSON.stringify((cached ??= build()))}`;
    },
    handleHotUpdate(ctx) {
      // Examples are imported as both an SFC and raw text. Refresh both together.
      if (ctx.file.includes("/workbench/examples/")) {
        ctx.server.ws.send({ type: "full-reload" });
        return [];
      }
      if (
        ctx.file.includes("/src/") ||
        ctx.file.includes("/node_modules/@rosalana/sandbox/")
      ) {
        cached = undefined;
        const module = ctx.server.moduleGraph.getModuleById("\0" + id);
        if (module) ctx.server.moduleGraph.invalidateModule(module);
        ctx.server.ws.send({ type: "full-reload" });
      }
    },
  };
}
