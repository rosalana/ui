import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "A segmented field for verification codes.",
  guidance:
    "Compose one UiPinInputInput per position, each with its index. The model is an array of strings. Use otp for one-time codes so the browser can fill them in, and @complete to react to a full code.",
  sections: [
    section(
      "model",
      "Model and completion",
      "v-model is an array with one string per position; it stays shorter than the number of inputs until the code is full. @complete fires once every position is filled and gets the array, join it for the request. Pasting a whole code fills all positions at once. Put UiPinInputSeparator between the inputs to group the digits.",
    ),
    section(
      "type-and-mask",
      "Type and masking",
      "type=\"number\" accepts digits only, the default text accepts any character. mask hides the entered characters like a password, placeholder is shown in an empty position and aria-invalid on the inputs marks a wrong code.",
    ),
  ],
  examples: [
    {
      file: "Verification",
      title: "Verifying an email",
      description: "Six digits in two groups; the code is checked once it is complete.",
    },
    {
      file: "Types",
      title: "Types and states",
      description: "Masked digits, letters, an invalid code and a disabled field.",
    },
  ],
} satisfies ComponentArticle;
