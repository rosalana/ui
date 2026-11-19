import { section, type Article } from "../schema";

export default {
  title: "useSelect",
  description: "Single, additive and range selection over a reactive array.",
  sections: [
    section(
      "usage",
      "Create a selection",
      "Pass a ref of items. Use getKey when items can be replaced by equivalent objects. The selected ref contains item objects.",
      `const items = ref([{ id: 1, name: 'Design' }, { id: 2, name: 'Build' }]);
const selection = useSelect(items, { getKey: (item) => item.id });

selection.select(items.value[0]);
selection.select(items.value[1], 'ctrl');
selection.selectAll();
selection.clear();`,
    ),
    section(
      "modes",
      "Selection modes",
      "click replaces the selection with one item. ctrl toggles an item additively. shift selects the contiguous range from the previous index. setSelected replaces selection explicitly; isSelected checks membership.",
    ),
  ],
  examples: [
    { file: "Lineup", title: "Click, Ctrl and Shift selection", description: "The three selection modes mapped to the keyboard, with select all and clear." },
    { file: "StableKeys", title: "Stable keys", description: "getKey keeps items selected when the array is replaced with fresh objects." },
  ],
} satisfies Article;
