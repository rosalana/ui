import { section, type ComponentArticle } from "../schema";

export default {
  category: "Forms",
  description: "Choose one value from a list of options.",
  guidance:
    "Compose Trigger, Value, Content and Item, and pair the trigger with a Label through its id. For long lists the user has to search, use a Combobox instead.",
  sections: [
    section(
      "anatomy",
      "How a select is put together",
      "UiSelect holds the value. UiSelectTrigger is the button that opens the list and UiSelectValue shows the picked option's text, or its placeholder while nothing is picked. UiSelectContent renders the list in a portal, filled with UiSelectItem entries; UiSelectGroup with UiSelectLabel and UiSelectSeparator split it into sections. The scroll buttons are shown by the content on their own when the list is taller than the screen.",
    ),
    section(
      "value",
      "Value and forms",
      "Bind v-model to a string. Without a value the placeholder shows; the select does not offer an empty option, so reset it from code by setting the model back to undefined. Pass name (and required) to UiSelect to submit the value with a native form.",
    ),
  ],
  examples: [
    { file: "Basic", title: "Basic", description: "A label, a placeholder and a few options." },
    {
      file: "Groups",
      title: "Groups and disabled items",
      description: "Label, group and separator organize options; a disabled item can't be picked.",
    },
    {
      file: "Required",
      title: "Required and disabled",
      description: "The button waits until a team is picked; a disabled select shows a value that can't change.",
    },
  ],
} satisfies ComponentArticle;
