import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue";
import { localeLanguage, normalizeLocale } from "../../helpers/locale";
import { useAppContext } from "../../plugin/context";
import { setLocale, setMessages } from "../../plugin/locale";
import {
  translate,
  type UiMessageKey,
  type UiMessageParams,
} from "../../plugin/messages";

export type UseLocale = {
  /** BCP 47 tag, `cs-CZ`. */
  locale: ComputedRef<string>;
  /** Language part, `cs`. Match texts on this. */
  language: ComputedRef<string>;
  /** Text of a component in the current locale, see `messages`. */
  t: (key: UiMessageKey, params?: UiMessageParams) => string;
  /** Switches the locale of the whole app, same as `setLocale()`. */
  set: typeof setLocale;
  /** Adds texts for a locale, same as `setMessages()`. */
  setMessages: typeof setMessages;
};

/**
 * The locale the components render in, set by the app (`createRosalanaApp` `locale` option,
 * `setLocale()`). Never the browser language, so the server and the browser render the same.
 *
 * A component with its own `locale` prop passes it as the override, which wins when set.
 */
export function useLocale(override?: MaybeRefOrGetter<string | null | undefined>): UseLocale {
  const ctx = useAppContext();

  const locale = computed(() => {
    const own = toValue(override);
    return own ? normalizeLocale(own, ctx.locale) : ctx.locale;
  });

  const language = computed(() => localeLanguage(locale.value));

  return {
    locale,
    language,
    t: (key, params) => translate(locale.value, ctx.messages, key, params),
    set: setLocale,
    setMessages,
  };
}
