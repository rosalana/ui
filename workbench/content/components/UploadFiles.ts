import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description:
    "File selection with validation, previews and removable entries.",
  guidance:
    "The model is a File array. Set accept, maxSize (bytes) and maxFiles, and handle rejected to explain type, size or limit failures. The block only collects files; sending them stays the application's job. Image files get a thumbnail, turn it off with :preview=\"false\".",
  sections: [
    section(
      "validation",
      "Validation",
      "accept filters by type, maxSize limits a single file and maxFiles limits the list; when the list is full the drop zone is disabled. Files that fail emit rejected with a list of { file, reason } where reason is type, size or limit, so you can say exactly what went wrong. Valid files from the same drop are still added, and a file already in the list is ignored. added and removed report what changed.",
    ),
    section(
      "single",
      "Single file",
      "With :multiple=\"false\" the list holds one file and a new file replaces it. The model is still an array.",
    ),
    section(
      "upload",
      "Sending the files",
      "Bind the model to an Inertia form field, e.g. v-model=\"form.documents\", and post the form: Inertia sends the files as multipart form data.",
    ),
  ],
  examples: [
    {
      file: "Attachments",
      title: "Documents with validation",
      description:
        "PDFs and images up to 5 MB, four at most. Rejected files are explained in a toast, and the form sends the rest.",
    },
    {
      file: "Gallery",
      title: "Image thumbnails",
      description: "Images show a thumbnail. added, removed and rejected tell the app what changed.",
    },
    {
      file: "Single",
      title: "Single and disabled",
      description: "A single file replaces the previous one; a disabled block takes no files.",
    },
    {
      file: "ItemActions",
      title: "Actions on each file",
      description: "The item-actions slot adds your own control to every entry, here to send a file on its own.",
    },
  ],
} satisfies ComponentArticle;
