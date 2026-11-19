import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "A file drop target for a custom upload flow.",
  guidance:
    "The public export is UiDropfile (lowercase f). It only collects files: listen to @dropped and send them yourself. For a complete file list, validation and previews, use the UploadFiles block.",
  sections: [
    section(
      "events-and-accept",
      "Dropped and rejected files",
      "Files come from a drop or from the file dialog opened by a click. Those that match accept (extensions like .csv, MIME types like image/png or image/*) are emitted as one array by @dropped; the others by @rejected, also when nothing is accepted. multiple=false takes a single file. The component doesn't keep the files, store them in your own state.",
    ),
    section(
      "slots",
      "Custom content",
      "title and subtext are HTML strings, pass an empty string to hide one; icon is an Iconify name. The icon, title, subtext and message slots replace those parts, the default slot replaces everything and gets isOverDropZone and open. clickable=false stops the zone from opening the file dialog on click, so a button inside can do it with open.",
    ),
  ],
  examples: [
    {
      file: "Basic",
      title: "Basic",
      description: "Images only; files of another type are reported as rejected.",
    },
    {
      file: "Options",
      title: "Single file and disabled",
    },
    {
      file: "Custom",
      title: "Custom content",
      description: "Your own content with a button that opens the file dialog.",
    },
  ],
} satisfies ComponentArticle;
