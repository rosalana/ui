import Typing from "./Typing.vue";
import Loop from "./Loop.vue";
import Fade from "./Fade.vue";
import Blur from "./Blur.vue";
import Slide from "./Slide.vue";
import Pop from "./Pop.vue";
import Flip from "./Flip.vue";
import Bounce from "./Bounce.vue";
import Rise from "./Rise.vue";
import Wave from "./Wave.vue";
import Scramble from "./Scramble.vue";
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
  Pop,
  Flip,
  Bounce,
  Rise,
  Wave,
  Scramble,
  Loop,
};