import { HtmlHTMLAttributes } from "vue";

export interface TextEffectProps {
    text: string;
    class?: HtmlHTMLAttributes['class'];
    whole?: boolean;
}