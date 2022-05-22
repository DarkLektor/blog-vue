import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

createApp(App).use(store, key).mount("#app");
