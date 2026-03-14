import Typing from "./Typing.vue";
import Loop from "./Loop.vue";
import Fade from "./Fade.vue";
import Blur from "./Blur.vue";
import Slide from "./Slide.vue";
import None from "./None.vue";
import { HtmlHTMLAttributes } from "vue";

export interface TextEffectProps {
    text: string;
    class?: HtmlHTMLAttributes['class'];
}

export const TextEffect = {
  None,
  Typing,
  Fade,
  Blur,
  Slide,
  Loop,
};