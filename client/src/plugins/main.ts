import type { App } from "vue";
import convertString from "./convertString";

function funcPlugins(app: App) {
  app.provide("convertString", convertString);
}
export default funcPlugins;
