import {
  computed,
  inject,
  provide,
  reactive,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";
import { useFilter, useId } from "reka-ui";

type CommandContext = {
  /** Current text of `UiCommandInput`. */
  search: Ref<string>;
  /** Searchable text of every mounted `UiCommandItem`, by item id. */
  items: Map<string, string>;
  /** Number of items matching the search. */
  matches: ComputedRef<number>;
  /** Shared `layoutId` of the highlight, so it slides between items of one command only. */
  highlightId: string;
  isMatch: (id: string) => boolean;
};

type CommandGroupContext = {
  /** Ids of the items inside the group. */
  items: Set<string>;
};

const COMMAND_CONTEXT: InjectionKey<CommandContext> = Symbol("UiCommand");
const COMMAND_GROUP_CONTEXT: InjectionKey<CommandGroupContext> =
  Symbol("UiCommandGroup");

export function provideCommandContext(): CommandContext {
  const { contains } = useFilter({ sensitivity: "base" });

  const search = ref("");
  const items = reactive(new Map<string, string>());

  function isMatch(id: string) {
    if (!search.value) return true;
    return contains(items.get(id) ?? "", search.value);
  }

  const context: CommandContext = {
    search,
    items,
    matches: computed(() => [...items.keys()].filter(isMatch).length),
    highlightId: `command-highlight-${useId()}`,
    isMatch,
  };

  provide(COMMAND_CONTEXT, context);
  return context;
}

export function injectCommandContext(): CommandContext {
  const context = inject(COMMAND_CONTEXT, undefined);
  if (!context) throw new Error("Command parts must be used inside <UiCommand>.");
  return context;
}

export function provideCommandGroupContext(): CommandGroupContext {
  const context = { items: reactive(new Set<string>()) };
  provide(COMMAND_GROUP_CONTEXT, context);
  return context;
}

export function injectCommandGroupContext(): CommandGroupContext | undefined {
  return inject(COMMAND_GROUP_CONTEXT, undefined);
}
