import { createApp, defineComponent, h, markRaw, reactive } from "vue";
import type { App, Component } from "vue";

const components: Component[] = reactive([]);



const VirtualRoot = defineComponent({
  name: "RosalanaVirtualLayer",
  setup() {
    return () => components.map((comp, i) => h(comp, { key: i }));
  },
});

let virtualApp: App | null = null;

export function mountVirtual(main: App) {
  if (typeof document === "undefined") return;

  const el = document.createElement("div");
  el.setAttribute("id", "rosalana-virtual");
  document.body.appendChild(el);

  virtualApp = createApp(VirtualRoot);
  virtualApp._context.provides = main._context.provides;

  virtualApp.mount(el);
}

export function accessGlobal(component: Component) {
  components.push(markRaw(component));
}
