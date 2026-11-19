import { createApp, defineComponent, h, type DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { ColorVars, createRosalanaApp } from "@rosalana/ui";
import { workbenchOptions } from "../config";
import Scene from "./Scene.vue";
import "../../src/tailwind.css";
import "../docs.css";

const block = new URLSearchParams(location.search).get("block") ?? "WebNav";
const page = {
  component: "DocumentationPreview",
  props: { errors: {}, block },
  url: "/",
  version: null,
  clearHistory: false,
  encryptHistory: false,
  rescuedProps: [],
  flash: {},
  rememberedState: {},
};
const Preview = defineComponent({
  inheritAttrs: false,
  render: () => h(Scene, { block }),
});
// A real Inertia client with local fixture data. Navigation remains client-side.
void createInertiaApp({
  page,
  // Inertia erases the page component’s Vue generics at its resolver boundary.
  resolve: () => Preview as unknown as DefineComponent,
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => [h(App, props), h(ColorVars)] });
    app.use(plugin).use(createRosalanaApp, workbenchOptions);
    app.mount(el!);
  },
});
