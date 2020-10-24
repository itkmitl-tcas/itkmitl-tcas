import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { authMiddleware } from "./middleware";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    components: {
      body: () => import("@components/Body.vue")
    },
    children: [
      {
        path: "/student",
        alias: "",
        component: () => import("@components/Student.vue"),
        children: [
          {
            path: "dashboard",
            name: "SDashboard",
            component: () => import("@views/student/Dashboard.vue"),
            meta: {
              requiresAuth: 1
            },
            children: [
              {
                path: "step1",
                name: "Step1",
                alias: "",
                component: () => import("@views/student/steps/Step1.vue"),
                meta: { step: 1 }
              },
              {
                path: "step2",
                name: "Step2",
                component: () => import("@views/student/steps/Step2.vue"),
                meta: { step: 2 }
              },
              {
                path: "step3",
                name: "Step3",
                component: () => import("@views/student/steps/Step3.vue"),
                meta: { step: 3 }
              },
              {
                path: "step4",
                name: "Step4",
                component: () => import("@views/student/steps/Step4.vue"),
                meta: { step: 4 }
              }
            ]
          },
          {
            path: "",
            name: "SLogin",
            component: () => import("@views/student/Login.vue"),
            meta: {
              requiresAuth: 0
            }
          }
        ]
      },
      {
        path: "/teacher",
        name: "Teacher",
        component: () => import("@components/Teacher.vue"),
        children: [
          {
            path: "dashboard",
            name: "TDashboard",
            alias: "",
            component: () => import("@views/teacher/Dashboard.vue")
          },
          {
            path: "login",
            name: "TLogin",
            component: () => import("@views/teacher/Login.vue")
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

authMiddleware(router);

export default router;
