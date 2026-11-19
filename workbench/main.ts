import { createApp } from "vue";
import { createRosalanaApp } from "../src/index";
import "../src/tailwind.css";
import App from "./App.vue";
import { workbenchOptions } from "./config";

const app = createApp(App);

app.use(createRosalanaApp, workbenchOptions);

app.mount("#app");
