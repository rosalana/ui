import { section, type ComponentArticle } from "../schema";

export default {
  category: "Blocks",
  description: "Text animation components for deliberate moments of emphasis.",
  guidance:
    "TextEffect is a set of components: Typing, Fade, Blur, Slide, Pop, Flip, Bounce, Rise, Wave and Scramble, plus Loop that cycles through texts with one of them. Each takes text and plays once on mount. Use them for headlines and moments of delight, not for text people need to read quickly.",
  sections: [
    section(
      "usage-notes",
      "Props",
      "Every effect takes text, class, whole and delay. By default the text is split and animated piece by piece; whole animates it as one. delay is the wait before playback in seconds. Loop takes texts, interval in milliseconds (3500 by default), delay in milliseconds and effect, the component to play for each text, e.g. :effect=\"TextEffect.Blur\". Without an effect, Loop swaps the texts without animation.",
    ),
    section(
      "motion",
      "Motion and accessibility",
      "Animated text moves, so keep essential instructions and error messages static. The effects play when the component mounts; use a key to replay one.",
    ),
  ],
  examples: [
    {
      file: "Effects",
      title: "All effects",
      description: "The same line in every effect. Reset replays them.",
      preview: "fill",
    },
    {
      file: "Options",
      title: "Whole text and delay",
      description: "whole animates the phrase as one, delay postpones the start.",
    },
    {
      file: "Loop",
      title: "Looping texts",
      description: "Loop cycles through texts with the effect of your choice.",
    },
    {
      file: "Hero",
      title: "A landing headline",
      description: "Staggered Rise lines and a delayed Fade, as a hero would use them.",
    },
  ],
} satisfies ComponentArticle;
