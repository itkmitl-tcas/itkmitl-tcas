// import { RouteRecord  } from 'vue-router';
import { RouteRecord } from 'vue-router';
import Vue from 'vue';
import env from '../environment';
import { AxiosResponse } from 'axios';
import Store, { userStore } from '@/store';

export function authMiddleware(router: any) {
  router.beforeEach(async (to: any, from: any, next: any) => {
    if (
      // case student or above require
      to.matched.some((record: RouteRecord) => record.meta.requiresAuth >= 1)
    ) {
      // verify token
      await Vue.prototype.$axios
        .post(`${env.BACK_URI}/auth`)

        // verify successed
        .then((resp: AxiosResponse) => {
          const user = {
            apply_id: resp.data.DATA.apply_id,
            permission: resp.data.DATA.permission
          };
          userStore.UPDATE_USER(user);
        })

        // verify failed
        .catch(() => {
          // redirect to login page
          next({ name: 'SLogin' });

          Vue.swal({
            // message
            icon: 'warning',
            title: 'ไม่สามารถเข้าสู่ระบบได้',
            text: `กรุณาเข้าสู่ระบบใหม่อีกครั้ง`
          });
        });
    } else if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth <= 0)) {
      // verify token
      await Vue.prototype.$axios
        .post(`${env.BACK_URI}/auth`)

        // verify successed
        .then((resp: AxiosResponse) => {
          const step = resp.data.DATA.step; // redicrec to dashboard step N
          next({ name: `Step${step}` });
        })
        .catch(() => {
          // redirect to login page
          // next({ name: "SLogin" });
        });
    }
    next();
  });
}
