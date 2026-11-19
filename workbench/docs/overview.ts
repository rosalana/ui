import { computed } from "vue";
import { pagesForSection, type DocumentationSection } from "./registry";
import { useDocsLocale } from "./locale";

/** Presentation metadata shared only by the home page and section indexes. */
export function useOverviewSections() {
  const { t } = useDocsLocale();
  const definitions = [
    {
      id: "guides",
      title: "guides",
      description: "overviewGuidesDescription",
      icon: "lucide:book-open",
      featured: "installation",
    },
    {
      id: "components",
      title: "components",
      description: "overviewComponentsDescription",
      icon: "lucide:component",
      featured: "Button",
    },
    {
      id: "blocks",
      title: "blocksSection",
      description: "overviewBlocksDescription",
      icon: "lucide:panels-top-left",
      featured: "DataTable",
    },
    {
      id: "composables",
      title: "composables",
      description: "overviewComposablesDescription",
      icon: "lucide:braces",
      featured: "useTable",
    },
    {
      id: "helpers",
      title: "helpers",
      description: "overviewHelpersDescription",
      icon: "lucide:wrench",
      featured: "helpers-text",
    },
  ] as const;

  return computed(() =>
    definitions.map((definition) => {
      const pages = pagesForSection(definition.id as DocumentationSection);
      return {
        id: definition.id,
        title: t(definition.title),
        description: t(definition.description),
        icon: definition.icon,
        pages,
        featured:
          pages.find((page) => page.id === definition.featured) ?? pages[0],
      };
    }),
  );
}
