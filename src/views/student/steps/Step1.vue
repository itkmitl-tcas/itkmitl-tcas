<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 1: ข้อมูลผู้สมัคร
    </span>
    <hr />

    <ValidationObserver ref="form">
      <form class="mt-3" @submit.prevent="onSave">
        <div class="form-group mt-4">
          <div class="row field-wrapper">
            <div class="col-12 col-md-12">
              <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
              <div class="d-flex flex-row">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="form.prename"
                  :options="prename"
                  name="radio-options"
                ></b-form-radio-group>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">ชื่อจริง:</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">นามสกุล:</label>
              <input v-model="form.surname" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">เบอร์โทรติดต่อ:</label>
              <input v-model="form.mobile" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">อีเมลล์:</label>
              <input v-model="form.email" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">โรงเรียน:</label>
              <input v-model="form.school_name" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">ประเภทการสมัคร:</label>
              <input v-model="form.apply_type" type="text" class="form-control" placeholder="ประเภทการสมัคร" disabled />
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <label class="subtitle font-weight-bold">แผนการศึกษา:</label>
                <b-form-select v-model="form.study_field" :options="study_field"></b-form-select>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">GPAX รวม:</label>
              <input v-model="form.gpax" type="text" class="form-control" placeholder="" disabled />
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider v-slot="{ errors }" rules="required|between:0,4">
                <label class="subtitle font-weight-bold">GPAX วิชาคณิตศาสตร์:</label>
                <input
                  v-model="form.gpax_match"
                  type="text"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคณิตศาสตร์"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider v-slot="{ errors }" rules="required|between:0,4">
                <label class="subtitle font-weight-bold">GPAX วิชาภาษาต่างประเทศ:</label>
                <input
                  v-model="form.gpax_eng"
                  type="text"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาภาษาต่างประเทศ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider v-slot="{ errors }" rules="required|between:0,4">
                <label class="subtitle font-weight-bold">GPAX วิชาคอมพิวเตอร์:</label>
                <input
                  v-model="form.gpax_com"
                  type="text"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคอมพิวเตอร์หรือการงานอาชีพ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 text-center">
              <hr />
              <button type="submit" class="btn btn-primary mt-4 px-5">
                <transition name="fade" mode="out-in">
                  <div
                    v-if="loading"
                    key="loading"
                    class="spinner-border"
                    style="height: 24px; width: 24px"
                    role="status"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  <span v-else key="message">
                    บันทึก
                  </span>
                </transition>
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { IUser, User } from '@/type';
import { extend } from 'vee-validate';
import { required, between } from 'vee-validate/dist/rules';
import { Component, Watch } from 'vue-property-decorator';
import SDashboard from '../Dashboard.vue';
import { mapGetters } from 'vuex';
import Store, { userStore } from '@/store';
import * as Sentry from '@sentry/browser';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
extend('between', {
  ...between,
  message: 'ค่าต้องอยู่ระหว่าง {min} ถึง {max} เท่านั้น'
});

@Component({
  name: 'Step1',
  computed: {
    DATA_USER: () => userStore.DATA_USER
  }
})
export default class Step1 extends SDashboard {
  DATA_USER!: IUser;
  form: IUser = new User();
  $axios: any;
  $env: any;
  loading = false;
  prename = [
    {
      text: 'นาย',
      value: 'นาย',
      disabled: true
    },
    {
      text: 'นาง',
      value: 'นาง',
      disabled: true
    },
    {
      text: 'นางสาว',
      value: 'นางสาว',
      disabled: true
    }
  ];
  study_field = [
    { value: undefined, text: 'เลือกแผนการศึกษา' },
    { value: 'วิทย์-คณิต', text: 'วิทย์-คณิต' },
    { value: 'ศิลป์-ภาษา', text: 'ศิลป์-ภาษา' },
    { value: 'ศิลป์-คำนวน', text: 'ศิลป์-คำนวน' },
    { value: 'สายอาชีพ (ปวช.)', text: 'สายอาชีพ (ปวช.)' },
    { value: 'สายอาชีพ (ปวส.)', text: 'สายอาชีพ (ปวส.)' },
    { value: 'อื่นๆ', text: 'อื่นๆ' }
  ];

  @Watch('DATA_USER', {
    immediate: true,
    deep: true
  })
  onChange(data: IUser) {
    this.form = data;
  }

  async onSave(): Promise<void> {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;

    this.loading = true;

    if (this.form.step !== 4) this.form.step = 2;

    await this.$axios
      .patch(`${this.$env.BACK_URI}/user`, this.form)
      .then(() => {
        this.$swal({
          icon: 'success',
          title: 'บันทึก',
          text: 'ระบบได้ทำการบันทึกข้อมูลผู้สมัครแล้ว'
        }).then(() =>
          this.$router.push({
            name: 'Step2'
          })
        );
      })
      .catch((err) => {
        const status = err.response?.status;
        const msg = err.response?.data.MESSAGE || err.message;

        if (status != 401) {
          Sentry.captureException(new Error(msg));
          this.$swal({
            icon: 'error',
            title: 'ไม่สามารถบันทึกข้อมูลผู้สมัครได้',
            text: `เกิดข้อผิดพลาดในการบันทึกข้อมูลผู้สมัคร กรุณาติดต่อผู้ดูแลระบบ \n ${msg}`
          });
        } else if (status == 401) {
          this.$swal({
            icon: 'warning',
            title: 'Session timeout',
            text: `หมดเวลาในการเข้าสู่ระบบ กรุณาเข้าสู่ระบบใหม่อีกครั้ง`
          }).then(() => {
            this.$router.push({ name: 'SLogin' });
          });
        }
      });

    this.loading = false;
  }
}
</script>

<style lang="scss"></style>
