import Typing from "./Typing.vue";
import Loop from "./Loop.vue";
import { HtmlHTMLAttributes } from "vue";

export interface TextEffectProps {
    text: string;
    class?: HtmlHTMLAttributes['class'];
}

export const TextEffect = {
  Typing,
  Loop,
};