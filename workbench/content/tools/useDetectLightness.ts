import { section, type Article } from "../schema";

export default {
  title: "useDetectLightness",
  description:
    "Estimate whether an image is light enough to need a dark foreground.",
  sections: [
    section(
      "usage",
      "Usage",
      "Pass a ref to an element that shows the image and use isLight to pick the text or icon color that stays readable on top of it. The element can be an img or any element with a CSS background image.",
      `import { ref } from 'vue';
import { useDetectLightness } from '@rosalana/ui';

const cover = ref<HTMLElement | null>(null);
const { isLight, process } = useDetectLightness(cover);

// <img ref="cover" :src="tournament.cover" alt="" />
// <h3 :class="isLight ? 'text-neutral-900' : 'text-white'">...</h3>`,
    ),
    section(
      "how",
      "How it measures",
      "The image is drawn onto a 20 by 20 canvas, the colors of all pixels are averaged and the perceived luminance (0.299 R + 0.587 G + 0.114 B) is compared with 128. Above it the image counts as light. It is an average of the whole picture, so a mostly dark photo with one bright spot reads as dark.",
    ),
    section(
      "reacting",
      "When it runs",
      "Processing starts after the component mounts and again whenever the element ref changes. When the image changes without the element being replaced, for example a carousel that swaps the src, pass a second ref as the watch source and the image is measured again when it changes. process runs the measurement on demand, after the image is replaced by other means.",
      `const index = ref(0);
const { isLight } = useDetectLightness(cover, index);`,
    ),
    section(
      "limitations",
      "Requirements and limits",
      "The canvas can only be read for images from the same origin or served with CORS headers; for others the measurement fails silently and isLight keeps its previous value. The initial value is true, before the image loads and on the server. It reads the DOM, so it works only in the browser, which is why the initial value must look fine until the measurement arrives.",
    ),
  ],
  examples: [
    {
      file: "Covers",
      title: "Readable text over covers",
      description:
        "Tournament covers of different brightness. The text color follows isLight when the cover changes.",
    },
  ],
} satisfies Article;
