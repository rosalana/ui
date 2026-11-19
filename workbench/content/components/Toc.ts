import { section, type ComponentArticle } from "../schema";

export default {
  category: "Navigation",
  description:
    "The headings of a page with the section being read, as a list or as a floating island.",
  guidance:
    "Pass the page's headings (id, text, level). UiToc is a plain list to place anywhere, UiTocIsland floats at the edge of the screen as one mark per heading and opens the list on hover or focus. Turn off hash when the app keeps its router in the URL hash, and set offset to the height of a fixed header.",
  sections: [
    section(
      "headings",
      "Headings and ids",
      "Each heading in the headings array needs the id of a real element on the page; clicking it scrolls there smoothly. level is 2 for a section and 3 for an indented subsection. The component does not read the page, so build the array from the same data that renders the headings.",
    ),
    section(
      "tracking",
      "How the active section is chosen",
      "The active heading is the last one whose top edge has scrolled above offset, measured from the top of the viewport. Set it to the height of a fixed header so a heading counts as read once it slides under it. The page may scroll in any container. select fires after a heading is chosen, and hash controls whether its id is written to the URL.",
    ),
  ],
  examples: [
    {
      file: "List",
      title: "List next to an article",
      description: "UiToc sticks beside the article and follows it as the page scrolls.",
      preview: "fill",
    },
    {
      file: "Island",
      title: "Floating island",
      description:
        "One mark per heading at the edge of the screen; the list opens on hover or focus. Here it is pinned inside the frame, the code shows it fixed to the screen.",
      preview: "fill",
    },
  ],
} satisfies ComponentArticle;
