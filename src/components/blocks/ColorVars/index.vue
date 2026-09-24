<script lang="ts">
import { Head } from "@inertiajs/vue3";
import { defineComponent, h } from "vue";
import { useColorCSS } from "../../../plugin/colors";
import { isBrowser } from "../../../plugin/env";

/**
 * Puts the generated color variables into the server-rendered <head>.
 *
 * Every `--color-*` the UI relies on comes from the plugin's palette. In the
 * browser the plugin writes them into <head> synchronously on install, which
 * is early enough that nothing ever paints without them. On the server there
 * is no DOM to write to, so without this component an SSR page would arrive
 * colorless and only pick up the palette after hydration.
 *
 * Render it once, anywhere inside the Inertia app:
 *
 * ```ts
 * createSSRApp({ render: () => [h(App, props), h(ColorVars)] })
 * ```
 *
 * Three things shape this file:
 *
 * 1. It renders on the server only. Inertia's client head manager is
 *    debounced, so emitting there too would either duplicate the plugin's
 *    style or — if the plugin stopped injecting — leave a gap before the
 *    first flush. Rendering nothing in the browser keeps the vnode structure
 *    identical on both sides, so hydration still matches.
 * 2. It is a render function, not a template. HTML parses `<style>` as raw
 *    text, so a `{{ }}` interpolation inside it is never compiled and would
 *    ship the literal braces. Passing the CSS as a vnode child avoids that.
 * 3. Render it *after* Inertia's own App component. The head manager is
 *    created in App's setup, so a sibling placed before it runs too early and
 *    finds nothing to register with.
 */
export default defineComponent({
  name: "ColorVars",
  setup() {
    if (isBrowser()) {
      return () => null;
    }

    const colorCSS = useColorCSS();

    return () =>
      h(Head, null, {
        default: () => [h("style", { id: "rosalana-ui-colors" }, colorCSS)],
      });
  },
});
</script>
