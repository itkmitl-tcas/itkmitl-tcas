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
          <div class="form-group mt-4">
            <ValidationProvider rules="required|digits:9" v-slot="{ errors }">
              <input
                type="text"
                v-model="form.id"
                class="form-control"
                id="id"
                placeholder="รหัสประจำตัว"
              />
              <small class="form-text text-muted mt-1"
                >รหัสประจำตัวผู้สมัคร จากสำนักทะเบียน</small
              >
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group mt-3">
            <ValidationProvider rules="required|prefix" v-slot="{ errors }">
              <input
                type="text"
                v-model="form.name"
                class="form-control"
                id="name"
                placeholder="ชื่อ (ไม่ต้องมีคำนำหน้า)"
              />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="text"
                v-model="form.surname"
                class="form-control"
                id="surname"
                placeholder="นามสกุล"
              />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">
            เข้าสู่ระบบ
          </button>
        </form>
      </ValidationObserver>
    </div>
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

extend("prefix", {
  validate: value => {
    const prefix = [
      /\u0e19\u0e32\u0e22/g,
      /\u0e19\u0e32\u0e07/g,
      /\u0e19\u0e32\u0e27\u0e2a\u0e32\u0e27/g,
      /\u0e40\u0e14\u0e47\u0e01\u0e0a\u0e32\u0e22/g,
      /\u0e40\u0e14\u0e47\u0e01\u0e2b\u0e0d\u0e34\u0e07/g
    ];
    return !prefix.some(item => value.match(item));
  },
  message: "ชื่อต้องไม่มีคำนำหน้า"
});

export default {
  data() {
    return {
      form: {
        id: 631001130,
        name: "?????",
        surname: "???????"
      }
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(async success => {
        if (!success) return;

        const result = await this.$axios.post(
          `${this.$env.BACK_URI}/auth/signin`,
          {
            apply_id: this.form.id,
            name: this.form.name,
            surname: this.form.surname
          }
        );

        if (result.status == 200) {
          // sign in message
          this.$swal({
            icon: "success",
            title: "เข้าสู่ระบบ",
            text: `ยินดีต้อนรับผู้สมัครหมายเลข ${this.form.id}`
          }).then(() => {
            this.$router.push({
              name: "Step1"
            });
          });
        }
      });
    }
  }
};
</script>
