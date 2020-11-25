import Vue from "vue";
import App from "./App.vue";
import VirtualMasonry from "../dist/vue-virtual-masonry.umd.min.js";

Vue.config.productionTip = false;

Vue.use(VirtualMasonry, {
  additionalDistance: 500
});

new Vue({
  render: h => h(App)
}).$mount("#app");
