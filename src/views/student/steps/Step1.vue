<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 1: ข้อมูลผู้สมัคร
    </span>
    <hr />

    <ValidationObserver ref="form">
      <form class="mt-3" @submit.prevent="onSubmit">
        <div class="form-group mt-4">
          <div class="field">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
              <div class="d-flex flex-row">
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    นาย
                  </label>
                </div>
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    นางสาว
                  </label>
                </div>
                <div class="form-check mr-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="exampleRadios1">
                    นาง
                  </label>
                </div>
              </div>
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="field">
            <div class="">
              <ValidationProvider rules="required|digits:8" v-slot="{ errors }">
                <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
                <input
                  type="text"
                  v-model="form.id"
                  class="form-control"
                  id="id"
                  placeholder="รหัสประจำตัว"
                />
                <small class="form-text text-warning">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
            <div class="">
              <ValidationProvider rules="required|digits:8" v-slot="{ errors }">
                <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
                <input
                  type="text"
                  v-model="form.id"
                  class="form-control"
                  id="id"
                  placeholder="รหัสประจำตัว"
                />
                <small class="form-text text-warning">{{ errors[0] }}</small>
              </ValidationProvider>
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
import { required, digits } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "ค่าต้องไม่ว่างเปล่า"
});
extend("digits", {
  ...digits,
  message: "ค่าต้องเป็นตัวเลขจำนวน {length} ตัวเท่านั้น"
});

export default {
  name: "Step1",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        id: 60070157,
        firstname: "วศิน",
        surname: "เสริมสัมพันธ์"
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) return;

        this.$swal({
          icon: "success",
          title: "เข้าสู่ระบบ",
          text: `ยินดีต้อนรับผู้สมัครหมายเลข ${this.form.id}`
        }).then(() => {
          this.$router.push({
            name: "Step1"
          });
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
