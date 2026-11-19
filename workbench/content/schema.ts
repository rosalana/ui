import type { DocExample, DocPage, DocSection } from "../docs/types";
/** Authored documentation. API tables and demo source are added by the registry. */
export type Article = Pick<DocPage, "title" | "description" | "sections"> & {
  examples?: DocExample[];
};
export const section = (
  id: string,
  title: string,
  text: string,
  code?: string,
  language = "ts",
): DocSection => ({ id, title, text, code, language });

export interface ComponentArticle {
  category: string;
  description: string;
  guidance: string;
  sections?: DocSection[];
  examples?: DocExample[];
  integration?: boolean;
}
