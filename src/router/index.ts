import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { authMiddleware, titleMiddleware } from './middleware';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    components: {
      body: () => import('@components/Body.vue')
    },
    children: [
      {
        path: '/close',
        name: 'Close',
        component: () => import('@views/Close.vue')
      },

      {
        path: '/student',
        alias: '',
        component: () => import('@components/Student.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'SDashboard',
            alias: '',
            component: () => import('@views/student/Dashboard.vue'),
            meta: {
              requiresAuth: 1
            },
            children: [
              {
                path: 'step1',
                name: 'Step1',
                alias: '',
                component: () => import('@views/student/steps/Step1.vue'),
                meta: { step: 1, title: 'ขั้นที่1: ข้อมูลผู้สมัคร' }
              },
              {
                path: 'step2',
                name: 'Step2',
                component: () => import('@views/student/steps/Step2.vue'),
                meta: { step: 2, title: 'ขั้นที่2: อัพโหลดเอกสาร' }
              },
              {
                path: 'step3',
                name: 'Step3',
                component: () => import('@views/student/steps/Step3.vue'),
                meta: { step: 3, title: 'ขั้นที่3: อัพโหลดผลงาน' }
              },
              {
                path: 'step4',
                name: 'Step4',
                component: () => import('@views/student/steps/Step4.vue'),
                meta: { step: 4, title: 'ขั้นที่4: เสร็จสิ้น' }
              }
            ]
          },
          {
            path: '',
            name: 'SLogin',
            component: () => import('@views/student/Login.vue'),
            meta: {
              requiresAuth: 0,
              title: 'เข้าสู่ระบบเพื่อยื่นผลงานการสมัคร'
            }
          }
        ]
      },
      {
        path: '/teacher',
        name: 'Teacher',
        alias: '',
        component: () => import('@components/Teacher.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'TDashboard',
            alias: '',
            component: () => import('@views/teacher/Dashboard.vue'),
            meta: {
              requiresTAuth: 1
            },
            children: [
              {
                path: 'main',
                name: 'TMain',
                alias: '',
                component: () => import('@views/teacher/Main.vue'),
                meta: {
                  title: 'จัดการผู้สมัคร'
                }
              },
              {
                path: 'member',
                name: 'TMember',
                component: () => import('@views/teacher/Member.vue'),
                meta: {
                  title: 'จัดการสมาชิค'
                }
              },
              {
                path: 'setting',
                name: 'TSetting',
                component: () => import('@views/teacher/Setting.vue'),
                meta: {
                  title: 'ตั้งค่าระบบ'
                }
              },
              {
                path: 'criteria',
                name: 'TCriteria',
                component: () => import('@views/teacher/Criteria.vue'),
                meta: {
                  title: 'จัดการเกณฑ์ผลงาน'
                }
              }
            ]
          },
          {
            path: 'login',
            name: 'TLogin',
            alias: '',
            component: () => import('@views/teacher/Login.vue'),
            meta: {
              requiresTAuth: 0,
              title: 'เข้าสู่ระบบ backoffice'
            }
          }
        ]
      },
      {
        path: '*',
        alias: '404',
        name: '404',
        component: () => import('@views/404.vue'),
        meta: {
          title: 'ไม่พบหน้าที่ท่านต้องการ'
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

authMiddleware(router);
titleMiddleware(router);

export default router;
