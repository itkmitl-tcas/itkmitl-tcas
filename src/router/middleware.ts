// import { RouteRecord  } from 'vue-router';
import { RouteRecord } from "vue-router";
import Vue from "vue";
import env from "../environment";

export function authMiddleware(router: any) {
  router.beforeEach(async (to: any, from: any, next: any) => {
    if (
      // case student or above require
      to.matched.some((record: RouteRecord) => record.meta.requiresAuth >= 1)
    ) {
      // verify token
      await Vue.prototype.$axios
        .post(`${env.BACK_URI}/auth`)
        .then(() => {
          // verify successed
          next();
        })
        .catch(() => {
          // verify failed
          Vue.swal({
            // message
            icon: "warning",
            title: "เข้าสู่ระบบ",
            text: `กรุณาเข้าสู่ระบบใหม่อีกครั้ง`
          }).then(() => {
            // redirect to login page
            next({ name: "SLogin" });
          });
        });
    }
    next();
  });
}
