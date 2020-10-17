import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

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
            alias: "",
            component: () => import("@views/student/Dashboard.vue")
          },
          {
            path: "login",
            name: "SLogin",
            component: () => import("@views/student/Login.vue")
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

export default router;
