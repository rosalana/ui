import type { HighlighterGeneric } from "shiki";

type Highlighter = HighlighterGeneric<string, string>;

/** Token colors come from CSS variables, so the code follows the app's colors and dark mode. */
const THEME = "rosalana";

let highlighter: Promise<Highlighter> | undefined;

// Loaded on first use only: an app without code blocks never downloads Shiki.
function getHighlighter(): Promise<Highlighter> {
  highlighter ??= Promise.all([
    import("shiki"),
    import("shiki/engine/javascript"),
  ]).then(([{ createHighlighter, createCssVariablesTheme }, { createJavaScriptRegexEngine }]) =>
    createHighlighter({
      themes: [createCssVariablesTheme({ name: THEME, variablePrefix: "--code-" })],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    }) as Promise<Highlighter>,
  );
  return highlighter;
}

/**
 * Highlights the code as HTML. Resolves to `null` for a language Shiki doesn't know,
 * the code then stays plain.
 */
export async function highlight(code: string, language: string): Promise<string | null> {
  const [{ bundledLanguages }, instance] = await Promise.all([
    import("shiki"),
    getHighlighter(),
  ]);

  if (!(language in bundledLanguages)) return null;
  if (!instance.getLoadedLanguages().includes(language)) {
    await instance.loadLanguage(language as keyof typeof bundledLanguages);
  }

  return instance.codeToHtml(code, { lang: language, theme: THEME });
}
