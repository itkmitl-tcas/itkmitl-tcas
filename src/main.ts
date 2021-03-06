/* --------------------------------- System --------------------------------- */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import env from './environment';

/* ---------------------------------- Style --------------------------------- */
import VueSweetalert2 from 'vue-sweetalert2';
import VueLazyload from 'vue-lazyload';
import PortalVue from 'portal-vue';
import {
  ButtonPlugin,
  VBTogglePlugin,
  CollapsePlugin,
  BFormRadioGroup,
  ToastPlugin,
  BootstrapVueIcons,
  FormFilePlugin,
  BadgePlugin,
  FormSelectPlugin,
  TablePlugin,
  ModalPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  InputGroupPlugin,
  FormInputPlugin,
  EmbedPlugin,
  AspectPlugin,
  TooltipPlugin
} from 'bootstrap-vue';

/* -------------------------------- Sentry IO ------------------------------- */
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: 'https://f27f8a5306ab4b598525019f236905bb@o465173.ingest.sentry.io/5518155',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true
    })
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: process.env.NODE_ENV == 'production' ? 1 : 0.1
});

Vue.use(ButtonPlugin);
Vue.use(VBTogglePlugin);
Vue.use(CollapsePlugin);
Vue.use(BootstrapVueIcons);
Vue.use(FormFilePlugin);
Vue.use(BadgePlugin);
Vue.use(FormSelectPlugin);
Vue.use(TablePlugin);
Vue.use(ModalPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(FormGroupPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(EmbedPlugin);
Vue.use(AspectPlugin);
Vue.use(TooltipPlugin);

Vue.use(VueLazyload);
Vue.use(PortalVue);
Vue.use(ToastPlugin);
Vue.use(VueSweetalert2);
Vue.use(VueCookies);

Vue.component('b-form-radio-group', BFormRadioGroup);

axios.defaults.withCredentials = true;
Vue.prototype.$env = env;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
