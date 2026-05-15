import { createApp } from "vue";
import { createRosalanaApp } from "../src/index";
import "../src/tailwind.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createRosalanaApp, {
  colors: {
    primary: {
      color: "blue",
    },
    muted: {
      color: "stone",
    },
    theme: {
      color: "stone",
    },
  },
});

app.mount("#app");
