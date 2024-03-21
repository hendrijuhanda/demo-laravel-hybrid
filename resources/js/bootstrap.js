import { createApp } from "vue";
import App from "../vue/App.vue";
import router from "../vue/router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
