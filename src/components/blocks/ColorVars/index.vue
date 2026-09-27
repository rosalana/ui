<script lang="ts">
import { Head } from "@inertiajs/vue3";
import { defineComponent, h } from "vue";
import { useColorCSS } from "../../../plugin/colors";

/**
 * Keeps the palette in Inertia's head on the server and during hydration.
 *
 * Register on both sides: a server-only Head entry is removed when Inertia's
 * client head manager flushes, even if the plugin updated that same style node.
 * The stable head key lets Inertia reconcile it without creating duplicates.
 *
 * Render after the Inertia App so its head manager is available:
 * createSSRApp({ render: () => [h(App, props), h(ColorVars)] })
 *
 * A render function is required because HTML parses style content as raw text.
 */
export default defineComponent({
  name: "ColorVars",
  setup() {
    const colorCSS = useColorCSS();

    return () =>
      h(Head, null, {
        default: () => [
          h(
            "style",
            { id: "rosalana-ui-colors", "head-key": "rosalana-ui-colors" },
            colorCSS,
          ),
        ],
      });
  },
});
</script>
