import { HtmlHTMLAttributes } from "vue";

export interface TextEffectProps {
    /** Text to animate */
    text: string;
    /** Class to apply to the text */
    class?: HtmlHTMLAttributes['class'];
    /** Whether to animate the whole text as one word or split it into words or letters */
    whole?: boolean;
    /** Delay in seconds before the animation starts */
    delay?: number;
}