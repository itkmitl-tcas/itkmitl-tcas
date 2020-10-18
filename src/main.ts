import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ButtonPlugin,
  VBTogglePlugin,
  CollapsePlugin,
  BFormRadioGroup,
  ToastPlugin,
  BootstrapVueIcons
} from "bootstrap-vue";
import PortalVue from "portal-vue";
import VueLazyload from "vue-lazyload";
import VueSweetalert2 from "vue-sweetalert2";

Vue.config.productionTip = process.env.NODE_ENV == "production" ? false : true;

Vue.use(ButtonPlugin);
Vue.use(VBTogglePlugin);
Vue.use(CollapsePlugin);
Vue.use(BootstrapVueIcons);
Vue.use(VueLazyload);
Vue.use(PortalVue);
Vue.use(ToastPlugin);
Vue.use(VueSweetalert2);

Vue.component("b-form-radio-group", BFormRadioGroup);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
