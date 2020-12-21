<template>
  <div class="login-container text-white">
    <div class="container">
      <div class="logo">
        <img v-lazy="require('@images/logo.png')" />
      </div>
      <div class="h1 mt-3">
        TCAS
      </div>
      <ValidationObserver ref="form">
        <form class="mt-3" @submit.prevent="onSubmit">
          <div class="text-white-50 text-center">
            เข้าสู่ระบบ เพื่อยื่นข้อมูลการสมัครรอบผลงาน
          </div>
          <div class="w-100 text-center mt-3">
            <a href="https://drive.google.com/file/d/1f_gqatgv4l-KO_yiHPOdpjv0Hef2D2oC/view?usp=sharing" target="_blank"
              >คู่มือการใช้งาน</a
            >
          </div>
          <div class="form-group mt-4">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                id="apply_id"
                v-model="form.apply_id"
                type="text"
                class="form-control"
                placeholder="รหัสประจำตัว"
              />
              <small class="form-text text-muted mt-1">รหัสประจำตัวผู้สมัคร จากสำนักทะเบียน</small>
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group mt-3">
            <ValidationProvider v-slot="{ errors }" rules="required|prefix">
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="ชื่อ (ไม่ต้องมีคำนำหน้า)"
              />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input id="surname" v-model="form.surname" type="text" class="form-control" placeholder="นามสกุล" />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">
            <transition name="fade" mode="out-in">
              <div
                v-if="loading"
                key="loading"
                class="spinner-border"
                style="height: 24px; width: 24px"
                role="status"
              ></div>
              <span v-else key="message">
                เข้าสู่ระบบ
              </span>
            </transition>
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, digits, between } from 'vee-validate/dist/rules';
import { IUser, User } from '@/type';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
extend('digits', {
  ...digits,
  message: 'ค่าต้องเป็นตัวเลขจำนวน {length} ตัวเท่านั้น'
});

extend('prefix', {
  validate: (value) => {
    const prefix = [
      /\u0e19\u0e32\u0e22/g,
      /\u0e19\u0e32\u0e07/g,
      /\u0e19\u0e32\u0e27\u0e2a\u0e32\u0e27/g,
      /\u0e40\u0e14\u0e47\u0e01\u0e0a\u0e32\u0e22/g,
      /\u0e40\u0e14\u0e47\u0e01\u0e2b\u0e0d\u0e34\u0e07/g
    ];
    return !prefix.some((item) => value.match(item));
  },
  message: 'ชื่อต้องไม่มีคำนำหน้า'
});

import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import { AxiosResponse, AxiosError } from 'axios';
import Store, { userStore, commonStore } from '@/store';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class Login extends Vue {
  loading = false;
  form: IUser = new User();
  $axios: any;
  $env: any;

  async onSubmit(): Promise<void> {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;

    // loading  on
    this.loading = true;

    const common: any = await commonStore.getCommon();
    if (!common.value) {
      this.$swal({
        icon: 'warning',
        title: 'ระบบยังไม่เปิดให้บริการ',
        text: 'ระบบยังไม่เปิดให้บริการ กรุณาตรวจสอบวันที่จากประกาศจากสถาบัน'
      });
    } else {
      await this.$axios
        .post(`${this.$env.BACK_URI}/auth/signin`, {
          apply_id: parseInt(`${this.form.apply_id}`),
          name: this.form.name,
          surname: this.form.surname
        })
        .then(async (resp: AxiosResponse) => {
          const user = {
            apply_id: resp.data.DATA.apply_id,
            permission: resp.data.DATA.permission,
            step: resp.data.DATA.step
          };
          userStore.UPDATE_USER(user);
          this.$swal({
            icon: 'success',
            title: 'เข้าสู่ระบบ',
            text: `ยินดีต้อนรับผู้สมัครหมายเลข ${this.form.apply_id}`
          }).then(() => {
            this.$router
              .push({
                path: `/student/dashboard/step${user.step}`
              })
              .catch((err) => err);
          });
        })
        .catch((err: AxiosError) => {
          const resp: any = err.response;
          const msg = err.response?.data.MESSAGE || err.message;
          Sentry.captureException(new Error(msg));
          if (resp.status == 406) {
            this.$swal({
              icon: 'warning',
              title: 'เข้าสู่ระบบ',
              text: 'กรุณาชำระค่าสมัคร'
            });
          } else if (resp.status == 404) {
            this.$swal({
              icon: 'warning',
              title: 'เข้าสู่ระบบ',
              text: 'รหัสประจำตัวหรือชื่อนามสกุล ไม่ถูกต้อง.'
            });
          } else {
            this.$swal({
              icon: 'warning',
              title: 'ไม่สามารถเข้าสู่ระบบได้',
              text: msg
            });
          }
        });
    }

    this.loading = false;
  }
}
</script>
