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
  BootstrapVueIcons,
  FormFilePlugin,
  BadgePlugin
} from "bootstrap-vue";
import PortalVue from "portal-vue";
import VueLazyload from "vue-lazyload";
import VueSweetalert2 from "vue-sweetalert2";
import VueCookies from "vue-cookies";
import axios from "axios";
import env from "./environment";

Vue.config.productionTip = process.env.NODE_ENV == "production" ? false : true;

Vue.use(ButtonPlugin);
Vue.use(VBTogglePlugin);
Vue.use(CollapsePlugin);
Vue.use(BootstrapVueIcons);
Vue.use(FormFilePlugin);
Vue.use(BadgePlugin);

Vue.use(VueLazyload);
Vue.use(PortalVue);
Vue.use(ToastPlugin);
Vue.use(VueSweetalert2);
Vue.use(VueCookies);

Vue.component("b-form-radio-group", BFormRadioGroup);

axios.defaults.withCredentials = true;
Vue.prototype.$env = env;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
