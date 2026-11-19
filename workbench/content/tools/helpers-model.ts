import { section, type Article } from "../schema";

export default {
  title: "Model modifiers",
  description:
    "Honor v-model.trim and v-model.number in your own input components.",
  sections: [
    section(
      "usage",
      "Usage",
      "Vue applies the lazy, number and trim modifiers by itself only on native elements. A custom component receives them as a modelModifiers prop and has to apply them, otherwise v-model.trim looks right in the template and does nothing. applyModelModifiers transforms a raw string for trim and number.",
      `import { applyModelModifiers, type ModelModifiers } from '@rosalana/ui/helpers';

const props = defineProps<{
  modelValue?: string | number;
  modelModifiers?: ModelModifiers;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();

function onInput(event: Event) {
  const raw = (event.target as HTMLInputElement).value;
  emit('update:modelValue', applyModelModifiers(raw, props.modelModifiers));
}

applyModelModifiers(' 42 ', { trim: true, number: true }); // 42
applyModelModifiers('Falcons ', { trim: true });           // 'Falcons'`,
    ),
    section(
      "numbers",
      "Numbers that do not parse",
      "With number the text is parsed with parseFloat, like Vue's own looseToNumber. A value that does not parse stays as the original text: an emptied field emits '' instead of NaN, and a half-typed 1e survives until the next keystroke.",
      `applyModelModifiers('', { number: true });    // ''
applyModelModifiers('1e', { number: true });  // '1e'
applyModelModifiers('3.5', { number: true }); // 3.5`,
    ),
    section(
      "timing",
      "lazy and debounce are about timing",
      "applyModelModifiers changes values only. ModelModifiers also describes lazy (emit on change instead of on every keystroke) and debounce (emit once the user pauses), but when to emit is the input component's job, so wire those to your events yourself. TextModelModifiers is the subset (lazy and trim) for a component whose value is always text.",
    ),
  ],
} satisfies Article;
