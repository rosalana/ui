# Dump

Debug dump component for inspecting any JavaScript value at runtime.

## Usage

```vue
<Dump :dump="anyValue" />
<Dump :dump="server" title="Server" />
<Dump :dump="server" title="Server" :auto-collapse="2" />
```

| Prop            | Type     | Default | Description                                      |
|-----------------|----------|---------|--------------------------------------------------|
| `dump`          | `any`    | —       | Value to inspect                                 |
| `title`         | `string` | —       | Label shown in the header                        |
| `autoCollapse`  | `number` | `3`     | Depth at which objects/arrays start collapsed    |

## Features

- **All JS types** — string, number, boolean, null, undefined, object, array, Date, RegExp, Function, Symbol, BigInt, NaN, ±Infinity
- **Circular reference detection** — detects via ancestor path (not WeakSet), so expand/collapse never produces false positives
- **Collapse / expand all** — buttons in the header affect the whole tree at once
- **Inline preview** — collapsed objects show a short preview of their contents
- **Highlight search** — the 🔍 button reveals an input; matching keys and string values are highlighted in amber across the whole tree, and all nodes auto-expand while a query is active
- **Raw JSON** — toggle to see the full `JSON.stringify` output
- **Copy** — header button copies the root value; hovering any node shows a per-node copy button

## File structure

```
Dump/
├── index.vue      Public API — thin wrapper, passes props to Root
├── Root.vue       Outer shell; creates and provides shared reactive state
├── Header.vue     Header bar + highlight input; injects filterQuery from Root
├── Renderer.vue   Recursive node renderer; injects all shared state from Root
└── types.ts       VType union + COLOR map (shared between Root and Renderer)
```

## State flow

`Root` creates three shared refs and provides them to all descendants:

| Key          | Type         | Purpose                                      |
|--------------|--------------|----------------------------------------------|
| `dump:et`    | `Ref<number>` | Increment to expand all expandable nodes    |
| `dump:ct`    | `Ref<number>` | Increment to collapse all expandable nodes  |
| `dump:filter`| `Ref<string>` | Current highlight query                     |

`Header` injects `dump:filter` directly to bind the input — no prop drilling needed.

`Renderer` injects all three, watches them, and re-calls itself recursively as `<DumpRenderer>`.
Because Vue 3 propagates provided values to all descendants automatically, `Renderer` does not need to re-provide them.

## Circular reference detection

An object is considered circular only if it appears in its **direct ancestor chain** on the current path, not in a flat "seen" set. This means:

- The same object referenced in two separate branches is **not** flagged as circular.
- Collapsing and re-expanding a node never produces false positives (the path is recomputed fresh on each render, unlike a WeakSet which retains state).
