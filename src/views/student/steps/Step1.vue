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
              <input
                type="text"
                v-model="form.name"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">นามสกุล:</label>
              <input
                type="text"
                v-model="form.surname"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">เบอร์โทรติดต่อ:</label>
              <input
                type="text"
                v-model="form.mobile"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">อีเมลล์:</label>
              <input
                type="text"
                v-model="form.email"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">โรงเรียน:</label>
              <input
                type="text"
                v-model="form.school_name"
                class="form-control"
                placeholder=""
                :disabled="form.school_name ? true : false"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">ประเภทการสมัคร:</label>
              <input
                type="text"
                v-model="form.apply_type"
                class="form-control"
                placeholder="ประเภทการสมัคร"
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold"
                >แผนการเรียน สาขาวิชา:</label
              >
              <input
                type="text"
                v-model="form.study_field"
                class="form-control"
                placeholder="แผนการเรียน หรือสาขาวิชา"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">GPAX รวม:</label>
              <input
                type="text"
                v-model="form.gpax"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider
                rules="required|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >GPAX วิชาคณิตศาสตร์:</label
                >
                <input
                  type="text"
                  v-model="form.gpax_match"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคณิตศาสตร์"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider
                rules="required|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >GPAX วิชาภาษาต่างประเทศ:</label
                >
                <input
                  type="text"
                  v-model="form.gpax_eng"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาภาษาต่างประเทศ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider
                rules="required|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >GPAX วิชาคอมพิวเตอร์:</label
                >
                <input
                  type="text"
                  v-model="form.gpax_com"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคอมพิวเตอร์หรือการงานอาชีพ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 text-center">
              <hr />
              <button type="submit" class="btn btn-primary mt-4 px-5">
                <div
                  class="spinner-border"
                  style="height: 24px; width: 24px"
                  role="status"
                  v-if="loading"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <span v-else>
                  บันทึก
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { IUser, User } from "@/type";
import { extend } from "vee-validate";
import { required, between } from "vee-validate/dist/rules";
import { Component, Vue, Watch } from "vue-property-decorator";
import SDashboard from "../Dashboard.vue";

extend("required", {
  ...required,
  message: "ค่าต้องไม่ว่างเปล่า"
});
extend("between", {
  ...between,
  message: "ค่าต้องอยู่ระหว่าง {min} ถึง {max} เท่านั้น"
});
import { mapGetters } from "vuex";
import env from "@/environment";
import { AxiosError, AxiosResponse } from "axios";
import Store, { userStore } from "@/store";

@Component({
  name: "Step1",
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
      text: "นาย",
      value: "นาย",
      disabled: true
    },
    {
      text: "นาง",
      value: "นาง",
      disabled: true
    },
    {
      text: "นางสาว",
      value: "นางสาว",
      disabled: true
    }
  ];

  @Watch("DATA_USER", {
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
    this.form.step = 2;

    await this.$axios
      .patch(`${this.$env.BACK_URI}/user`, this.form)
      .then((resp: AxiosResponse) => {
        this.$swal({
          icon: "success",
          title: "บันทึก",
          text: "ระบบได้ทำการบันทึกข้อมูลผู้สมัครแล้ว"
        }).then(() =>
          this.$router.push({
            name: "Step2"
          })
        );
      })
      .catch((err: AxiosError) => {
        this.$swal({
          icon: "error",
          title: "ไม่สามารถบันทึก",
          text: `ไม่สามารถบันทึกข้อมูลผู้สมัครได้ กรุณาลองใหม่อีกครั้ง \n ${err.message}`
        }).then(() => this.$router.go(0));
      });

    this.loading = false;
  }
}
</script>

<style lang="scss"></style>
