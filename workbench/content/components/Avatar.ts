import { section, type ComponentArticle } from "../schema";

export default {
  category: "Data display",
  description: "A user image with a predictable fallback and loading state.",
  guidance:
    "Compose UiAvatarImage, UiAvatarFallback and optionally UiAvatarLoading inside UiAvatar. The fallback shows initials from name when the image is missing or fails to load. Always give the image an alt text.",
  sections: [
    section(
      "states",
      "Image, loading and fallback",
      "The image shows once it has loaded. Until then UiAvatarLoading covers the avatar with a spinner, so a slow image never flashes the initials; place it after UiAvatarImage. If the image fails or has no src, the fallback stays. Pass loading to UiAvatarLoading to force the state yourself, for example while a new picture uploads.",
    ),
    section(
      "fallback",
      "Fallback text",
      "UiAvatarFallback turns name into initials ('Ada Lovelace' becomes AL), or a question mark without a name. Pass modifier to build your own text from the name, or put anything into the slot, such as an icon.",
    ),
  ],
  examples: [
    { file: "Sizes", title: "Sizes" },
    { file: "Fallback", title: "Fallbacks", description: "Initials, a custom modifier, no name and a slot." },
    {
      file: "SlowPictures",
      title: "Pictures on a slow connection",
      description:
        "Team members whose pictures arrive one by one. Each avatar spins until its picture is there, a broken one falls back to the initials and a member without a picture shows them at once.",
    },
    {
      file: "Loading",
      title: "Uploading a picture",
      description: "A spinner covers the avatar while the new picture is on its way.",
    },
    { file: "Team", title: "Avatar stack", description: "Overlapping avatars for the members of a team." },
  ],
} satisfies ComponentArticle;
