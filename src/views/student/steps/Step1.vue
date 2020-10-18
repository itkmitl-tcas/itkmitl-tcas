<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 1: ข้อมูลผู้สมัคร
    </span>
    <hr />

    <ValidationObserver ref="form">
      <form class="mt-3" @submit.prevent="onSubmit">
        <div class="form-group mt-4">
          <div class="row field-wrapper">
            <div class="col-12 col-md-12">
              <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
              <div class="d-flex flex-row">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="form.prefix"
                  :options="prefix"
                  name="radio-options"
                ></b-form-radio-group>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">ชื่อจริง:</label>
              <input
                type="text"
                v-model="form.firstname"
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
                v-model="form.tel"
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
                v-model="form.school"
                class="form-control"
                placeholder=""
                disabled
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold"
                >แผนการเรียน สาขาวิชา:</label
              >
              <input
                type="text"
                v-model="form.field"
                class="form-control"
                placeholder="แผนการเรียน หรือสาขาวิชา"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="subtitle font-weight-bold">เกรดรวม GPAX:</label>
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
                rules="required|double|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >เกรดรวมวิชาคณิตศาสตร์:</label
                >
                <input
                  type="text"
                  v-model="form.mGpax"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคณิตศาสตร์"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider
                rules="required|double|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >เกรดรวมวิชาภาษาต่างประเทศ:</label
                >
                <input
                  type="text"
                  v-model="form.eGpax"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาภาษาต่างประเทศ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 col-md-6">
              <ValidationProvider
                rules="required|double|between:0,4"
                v-slot="{ errors }"
              >
                <label class="subtitle font-weight-bold"
                  >เกรดรวมวิชาคอมพิวเตอร์:</label
                >
                <input
                  type="text"
                  v-model="form.cGpax"
                  class="form-control"
                  placeholder="เกรด 5,6 ภาคการศึกษา วิชาคอมพิวเตอร์หรือการงานอาชีพ"
                />
                <small class="form-text text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-primary mt-4 px-5">
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import {
  required,
  // digits,
  double,
  between
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "ค่าต้องไม่ว่างเปล่า"
});
extend("double", {
  ...double,
  message: "ค่าต้องเป็นตัวเลขทศนิยมเท่านั้น"
});
extend("between", {
  ...between,
  message: "ค่าต้องอยู่ระหว่าง {min} ถึง {max} เท่านั้น"
});
// extend("digits", {
//   ...digits,
//   message: "ค่าต้องเป็นตัวเลขจำนวน {length} ตัวเท่านั้น"
// });

export default {
  name: "Step1",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        prefix: "นาย",
        id: 60070157,
        firstname: "วศิน",
        surname: "เสริมสัมพันธ์",
        tel: "0924644891",
        email: "dev.vasin@gmail.com",
        school: "โรงเรียนนวมินทราชินูทิศเบญจมราชาลัย",
        field: "วิทย์-คณิต",
        gpax: 2.86,
        mGpax: 2.9,
        eGpax: 3.5,
        cGpax: 3.8
      },
      prefix: [
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
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;

        this.$swal({
          icon: "success",
          title: "บันทึกข้อมูล",
          text: `ระบบได้ทำการบันทึกข้อมูลผู้สมัครแล้ว`
        }).then(() => {
          this.$router.push({
            name: "Step2"
          });
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
