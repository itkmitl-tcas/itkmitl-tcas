<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 1: ข้อมูลเอกสาร
    </span>
    <hr />

    <ValidationObserver ref="form">
      <form class="mt-3" enctype="multipart/form-data" @submit.prevent="onSave">
        <div class="form-group mt-4">
          <div class="row field-wrapper">
            <div class="col-12">
              <ValidationProvider
                rules="required"
                v-slot="{ validate, errors }"
              >
                <label class="subtitle font-weight-bold">ใบ ปพ.1</label>
                <small class="d-flex text-black-80 mb-3"
                  >ใบแสดงผลการเรียนเฉลี่ยสำสมในระดับชั้นมัธยมศึกษาตอนปลาย ๕
                  ภาคเรียนการศึกษา (กรณีสำเร็จการศึกษาแล้วใช้ ๖
                  ภาคเรียนการศึกษา)</small
                >
                <b-form-file
                  name="transcript"
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                  placeholder="CHOOSE TRANSCRIPT(.PDF)"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider
                rules="required"
                v-slot="{ validate, errors }"
              >
                <label class="subtitle font-weight-bold"
                  >สำเนาบัตรประชาชน*</label
                >
                <small class="d-flex text-black-80 mb-3"
                  >สำเนาบัตประชาชน พร้อมลงนามสำเนาถูกต้อง</small
                >
                <b-form-file
                  name="identity_card"
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                  placeholder="CHOOSE TRANSCRIPT(.PDF)"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <ValidationProvider
                rules="required"
                v-slot="{ validate, errors }"
              >
                <label class="subtitle font-weight-bold"
                  >สำเนาบัตรประจำตัวนักเรียน*</label
                >
                <small class="d-flex text-black-80 mb-3"
                  >สำเนาบัตรประจำตัวนักเรียน พร้อมลงนามสำเนาถูกต้อง</small
                >
                <b-form-file
                  name="student_card"
                  @change="
                    fileChange($event.target.name, $event.target.files);
                    validate($event);
                  "
                  placeholder="CHOOSE TRANSCRIPT(.PDF)"
                  accept=".pdf, .PDF"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <label class="subtitle font-weight-bold"
                >สำเนาใบเปลี่ยนชื่อ*</label
              >
              <small class="d-flex text-black-80 mb-3"
                >สำเนาบัตรเปลี่ยนชื่อ (ถ้ามี) พร้อมลงนามสำเนาถูกต้อง</small
              >
              <b-form-file
                name="name_chage"
                @change="
                  fileChange($event.target.name, $event.target.files);
                  validate($event);
                "
                placeholder="CHOOSE TRANSCRIPT(.PDF)"
                accept=".pdf, .PDF"
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
            <!-- 
          <div class="col-12">
            <label class="subtitle font-weight-bold">สำเนาบัตรประจำตัวนักเรียน*</label>
            <small class="d-flex text-black-80 mb-3">สำเนาบัตรประจำตัวนักเรียน พร้อมลงนามสำเนาถูกต้อง</small>
            <b-form-file v-model="form.student_card" :state="Boolean(form.student_card)" placeholder="CHOOSE STUDENT CARD (.PDF)" accept=".pdf .PDF" drop-placeholder="Drop file here..."></b-form-file>
          </div>
          <div class="col-12">
            <label class="subtitle font-weight-bold">สำเนาใบเปลี่ยนชื่อ</label>
            <small class="d-flex text-black-80 mb-3">สำเนาบัตรเปลี่ยนชื่อ (ถ้ามี) พร้อมลงนามสำเนาถูกต้อง</small>
            <b-form-file v-model="form.name_chage" :state="Boolean(form.name_chage)" placeholder="CHOOSE NAME CHANGE (.PDF)" accept=".pdf .PDF" drop-placeholder="Drop file here..."></b-form-file>
          </div>
          -->
            <div class="col-12 text-center">
              <hr />
              <router-link
                :to="{ name: 'Step1' }"
                class="btn border border-primary text-primary mt-4 px-5 mr-3"
              >
                ย้อนกลับ
              </router-link>
              <button type="submit" class="btn btn-primary mt-4 px-5">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {
  // ValidationProvider,
  ValidationObserver,
  extend
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
import env from "@/environment";
import { Docs } from "@/type/docs";
import { Component, Vue, Watch } from "vue-property-decorator";
import SDashboard from "../Dashboard.vue";
import { AxiosError } from "axios";

extend("required", {
  ...required,
  message: "ค่าต้องไม่ว่างเปล่า"
});

@Component({
  name: "Step2"
})
export default class Step2 extends SDashboard {
  docs = new FormData();
  loading = false;

  // on file change
  fileChange(name, file) {
    this.docs.append(name, file[0]);
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
      .then(res => {
        this.$swal({
          icon: "success",
          title: "บันทึก",
          text: "ระบบได้ทำการบันทึกข้อมูลเอกสารผู้สมัครแล้ว"
        }).then(() =>
          this.$router.push({
            name: "Step3"
          })
        );
      })
      .catch((err: AxiosError) => {
        this.$swal({
          icon: "error",
          title: "ไม่สามารถบันทึก",
          text: `ไม่สามารถบันทึกข้อมูลเอกสารผู้สมัครได้ กรุณาลองใหม่อีกครั้ง \n ${err.message}`
        }).then(() => this.$router.go(0));
      });

    this.loading = false;
  }
}
</script>

<style lang="scss"></style>
