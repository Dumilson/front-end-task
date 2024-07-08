import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".dark",
    },
  },
});
app.use(ToastService);
app.directive("ripple", Ripple);
app.mount("#app");
