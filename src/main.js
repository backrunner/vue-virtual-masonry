import Vue from "vue";
import App from "./App.vue";
import VirtualMasonry from "./libEntry.js";

Vue.config.productionTip = false;

Vue.use(VirtualMasonry, {
  additionalDistance: 1000
});

new Vue({
  render: h => h(App)
}).$mount("#app");
