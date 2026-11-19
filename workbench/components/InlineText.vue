<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{ text: string }>();
// A small safe renderer for TSDoc prose, not an HTML/Markdown document engine.
const parts = computed(() => {
  const result: { kind: string; text: string; href?: string }[] = [];
  const pattern =
    /<br\s*\/?\s*>|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*/g;
  let position = 0;
  for (const match of props.text.matchAll(pattern)) {
    if (match.index! > position)
      result.push({
        kind: "text",
        text: props.text.slice(position, match.index),
      });
    if (match[0].startsWith("<br")) result.push({ kind: "break", text: "" });
    else if (match[1]) result.push({ kind: "code", text: match[1] });
    else if (match[2])
      result.push({ kind: "link", text: match[2], href: match[3] });
    else result.push({ kind: "strong", text: match[4] });
    position = match.index! + match[0].length;
  }
  result.push({ kind: "text", text: props.text.slice(position) });
  return result;
});
</script>
<template>
  <span class="inline-prose">
    <template v-for="(part, index) in parts" :key="index">
      <br v-if="part.kind === 'break'" />
      <code v-else-if="part.kind === 'code'">{{ part.text }}</code>
      <a
        v-else-if="part.kind === 'link'"
        :href="part.href"
        target="_blank"
        rel="noreferrer"
      >
        {{ part.text }}
      </a>
      <strong v-else-if="part.kind === 'strong'">{{ part.text }}</strong>
      <template v-else>{{ part.text }}</template>
    </template>
  </span>
</template>
