import { section, type Article } from "../schema";

export default {
  title: "useComputedPage",
  description: "A typed, reactive view into Inertia page props.",
  sections: [
    section(
      "usage",
      "Usage",
      "useComputedPage returns a computed ref of the Inertia page props, or of one prop when you pass a key. The type parameter is your promise about the shape; nothing is validated at runtime. It is the building block of useAuth and usePreferences.",
      `import { computed } from 'vue';
import { useComputedPage } from '@rosalana/ui';

const user = useComputedPage<{ name: string } | undefined>('auth.user');
const title = computed(() => user.value?.name ?? 'Guest');`,
    ),
    section(
      "dot-notation",
      "Dot notation",
      "The key walks the props with dots, so 'tournament.owner.name' reads props.tournament.owner.name. When a part of the path is missing or null, the result is undefined instead of an error. Include undefined in your type when the prop can be absent.",
      `const ownerName = useComputedPage<string | undefined>('tournament.owner.name');`,
    ),
    section(
      "whole-page",
      "Read all props",
      "Without a key you get the whole props object. The ref is computed from usePage(), so it updates when an Inertia visit replaces the props. Use it in components that are not page components as well, there is no need to pass props down.",
      `const props = useComputedPage<{
  tournaments: { id: number; name: string }[];
}>();`,
    ),
  ],
} satisfies Article;
