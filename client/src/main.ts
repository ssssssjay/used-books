import { createApp } from "vue";
import { createPinia } from "pinia";
// import mixins from "@/mixins/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/reset.css";
import "@/styles/main.css";
import store from "@/store";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(store);
// app.mixin(mixins);
app.mount("#app");

window.Kakao.init("4b6c5749640870e5658414bdbfd3d03c");
