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
            เข้าสู่ระบบ Backoffice
          </div>
          <div class="form-group mt-4">
            <ValidationProvider v-slot="{ errors }" rules="required|digits:8">
              <input id="id" v-model="form.id" type="text" class="form-control" placeholder="ID" />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <div class="form-group mt-3">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                id="password"
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="PASSWORD"
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, digits } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
extend('digits', {
  ...digits,
  message: 'ค่าต้องเป็นตัวเลขจำนวน {length} ตัวเท่านั้น'
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        id: null,
        password: null
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) return;
        this.$router.push({
          name: 'TDashboard'
        });
      });
    }
  }
};
</script>
