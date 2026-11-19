import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Choose one or more numeric values along a track.",
  guidance:
    "The model is an array, even for a single thumb; two values make a range. Set min, max and step, and give the slider a visible Label or an aria-label.",
  sections: [
    section(
      "thumbs",
      "One thumb or more",
      "The number of values in the model is the number of thumbs. By default the track is filled up to the thumb, or between the first and the last thumb. min-steps-between-thumbs keeps the thumbs of a range apart.",
    ),
    section(
      "marks-and-tooltips",
      "Marks and tooltips",
      "marks puts dots on the track: true on every step, a number every that many units, or an array of values where an item { value, label } also gets a label under the track. mark-labels labels every mark with its value, and a click on a label moves the nearest thumb there. tooltip shows the value over a thumb while it is hovered, dragged or focused; it takes true, a template with {value}, one template per thumb or a function. tooltip-always keeps it open.",
    ),
    section(
      "fill-pieces",
      "Fill",
      "The thumbs split the track into pieces numbered from the start: 0 is min to the first thumb, 1 the piece between the first and the second thumb and so on, a negative number counts from the end. fill takes false for nothing or an array of the pieces to color. transparent removes the track colors altogether, for a gradient of your own behind the slider.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "One thumb; the label shows the current value." },
    { file: "Range", title: "Range", description: "Two thumbs, steps and a tooltip per thumb." },
    {
      file: "Marks",
      title: "Steps and marks",
      description: "Marks on every step, on chosen values with labels, or every n units.",
    },
    { file: "Tooltips", title: "Tooltips" },
    { file: "Fill", title: "Fill and transparent track" },
    { file: "Vertical", title: "Vertical", description: "orientation=\"vertical\" fills the height of its parent." },
    { file: "Disabled", title: "Disabled" },
  ],
} satisfies ComponentArticle;
