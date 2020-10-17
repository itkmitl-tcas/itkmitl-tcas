import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ButtonPlugin, VBTogglePlugin, CollapsePlugin } from "bootstrap-vue";
import VueLazyload from "vue-lazyload";
import VueSweetalert2 from "vue-sweetalert2";

Vue.config.productionTip = process.env.NODE_ENV == "production" ? false : true;

Vue.use(ButtonPlugin);
Vue.use(VBTogglePlugin);
Vue.use(CollapsePlugin);
Vue.use(VueLazyload);
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
