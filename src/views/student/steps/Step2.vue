<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 2: ข้อมูลเอกสาร
    </span>
    <hr />

    <ValidationObserver ref="form">
      <form class="mt-3" enctype="multipart/form-data" @submit.prevent="onSave">
        <div class="form-group mt-4">
          <div class="row field-wrapper">
            <div class="col-12">
              <ValidationProvider v-slot="{ validate, errors }" :rules="{ required: transcript ? false : true }">
                <label class="subtitle font-weight-bold">ใบ ปพ.1*</label>
                <small class="d-flex text-black-80 mb-3"
                  >ใบแสดงผลการเรียนเฉลี่ยสำสมในระดับชั้นมัธยมศึกษาตอนปลาย ๕ ภาคเรียนการศึกษา (กรณีสำเร็จการศึกษาแล้วใช้
                  ๖ ภาคเรียนการศึกษา)</small
                >
                <b-form-file
                  name="transcript"
                  :placeholder="transcript ? 'UPDATE TRANSCRIPT' : 'CHOOSE TRANSCRIPT(.PDF)'"
                  :class="{ active: transcript }"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                ></b-form-file>
                <small v-if="transcript" class="form-text">
                  <a :href="transcript" target="_blank">ดูใบแสดงผลการเรียน</a>
                </small>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider v-slot="{ validate, errors }" :rules="{ required: identity_card ? false : true }">
                <label class="subtitle font-weight-bold">สำเนาบัตรประชาชน*</label>
                <small class="d-flex text-black-80 mb-3">สำเนาบัตประชาชน พร้อมลงนามสำเนาถูกต้อง</small>
                <b-form-file
                  name="identity_card"
                  :placeholder="identity_card ? 'UPDATE IDENTITY CARD' : 'CHOOSE IDENTITY CARD(.PDF)'"
                  :class="{ active: identity_card }"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                ></b-form-file>
                <small v-if="identity_card" class="form-text">
                  <a :href="identity_card" target="_blanks">ดูสำเนาบัตรประชาชน</a>
                </small>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider v-slot="{ validate, errors }" :rules="{ required: student_card ? false : true }">
                <label class="subtitle font-weight-bold">สำเนาบัตรประจำตัวนักเรียน*</label>
                <small class="d-flex text-black-80 mb-3">สำเนาบัตรประจำตัวนักเรียน พร้อมลงนามสำเนาถูกต้อง</small>
                <b-form-file
                  name="student_card"
                  :placeholder="student_card ? 'UPDATE STUDENT CARD' : 'CHOOSE STUDENT CARD(.PDF)'"
                  :class="{ active: student_card }"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                ></b-form-file>
                <small v-if="student_card" class="form-text">
                  <a :href="student_card" target="_blanks">ดูสำเนาบัตรประจำตัวนักเรียน</a>
                </small>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider v-slot="{ validate, errors }" :rules="{ required: student_card ? false : true }">
                <label class="subtitle font-weight-bold">แฟ้มสะสมผลงาน*</label>
                <small class="d-flex text-black-80 mb-3">ไฟล์แฟ้มสะสมผลงานแบบเต็มจำนวนไม่เกิน 10 หน้า PDF</small>
                <b-form-file
                  name="full_portfolio"
                  :placeholder="full_portfolio ? 'UPDATE PORTFOLIO' : 'CHOOSE PORTFOLIO(.PDF)'"
                  :class="{ active: full_portfolio }"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                ></b-form-file>
                <small v-if="full_portfolio" class="form-text">
                  <a :href="full_portfolio" target="_blanks">ดูแฟ้มสะสมผลงาน</a>
                </small>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <label class="subtitle font-weight-bold">สำเนาใบเปลี่ยนชื่อ</label>
              <small class="d-flex text-black-80 mb-3">สำเนาบัตรเปลี่ยนชื่อ (ถ้ามี) พร้อมลงนามสำเนาถูกต้อง</small>
              <b-form-file
                name="name_change"
                :placeholder="name_change ? 'UPDATE NAME CHANGE' : 'CHOOSE NAME CHANGE(.PDF)'"
                :class="{ active: name_change }"
                accept=".pdf, .PDF"
                drop-placeholder="Drop file here..."
                @change="fileChange($event.target.name, $event.target.files)"
              ></b-form-file>
              <small v-if="name_change" class="form-text">
                <a :href="name_change" target="_blanks">ดูสำเนาใบเปลี่ยนชื่อ</a>
              </small>
            </div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 text-center d-flex flex-column flex-md-row justify-content-center">
              <router-link
                :to="{ name: 'Step1' }"
                class="btn border border-primary text-primary mt-4 px-5 mr-0 mr-md-3"
              >
                ย้อนกลับ
              </router-link>
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
import { extend } from 'vee-validate';
import SDashboard from '../Dashboard.vue';
import env from '@/environment';
import { required } from 'vee-validate/dist/rules';
import { Component, PropSync } from 'vue-property-decorator';
import { userStore } from '@/store';
import { DocsItem } from '@/type/docs';
import { User } from '@/type/index';
import * as Sentry from '@sentry/browser';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});

@Component({
  name: 'Step2'
})
export default class Step2 extends SDashboard {
  docs = new FormData();
  loading = false;
  userStore = userStore;

  get userData() {
    return this.userStore.DATA_USER;
  }

  get docsData() {
    return this.userData.document;
  }

  get transcript() {
    return this.docsData ? this.docsData.transcript : null;
  }
  get identity_card() {
    return this.docsData ? this.docsData.identity_card : null;
  }
  get student_card() {
    return this.docsData ? this.docsData.student_card : null;
  }
  get name_change() {
    return this.docsData ? this.docsData.name_change : null;
  }
  get full_portfolio() {
    return this.docsData ? this.docsData.full_portfolio : null;
  }

  // userData: User = this.userData;
  // documentData: Record<string, string> | undefined = this.userData.DATA_USER.document;

  // on file change
  fileChange(name, file) {
    if (file && file[0]) {
      console.log(file);
      const file_type = file[0].type;
      if (file_type !== 'application/pdf') {
        return this.$swal({
          icon: 'warning',
          title: 'ประเภทไฟล์ไม่ถูกต้อง',
          text: `ประเภทไฟล์ต้องเป็นไฟล์ application/pdf เท่านั้น แต่ไฟล์คุณเป็นประเภท ${file_type}`
        });
      }
      // check file size
      const file_size = +(file[0].size / 1024 / 1024).toFixed(2);
      if (file_size > 100) {
        return this.$swal({
          icon: 'warning',
          title: 'ขนาดไฟล์ไม่ถูกต้อง',
          text: `ขนาดไฟล์ต้องไม่เกิน 100MB แต่ไฟล์ของคุณมีขนาด ${file_size}MB`
        });
      }
      this.docs.append(name, file[0]);
    }
  }

  // upload to backend
  async onSave() {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;

    this.loading = true;

    await this.$axios
      .post(`${env.BACK_URI}/docs`, this.docs)
      .then(() => {
        this.$swal({
          icon: 'success',
          title: 'บันทึก',
          text: 'ระบบได้ทำการบันทึกข้อมูลเอกสารผู้สมัครแล้ว'
        }).then(() =>
          this.$router.push({
            name: 'Step3'
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
            title: 'ไม่สามารถบันทึกข้อมูลเอกสารได้',
            text: `เกิดข้อผิดพลาดในการบันทึกข้อมูลเอกสาร กรุณาติดต่อผู้ดูแลระบบ \n ${msg}`
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
