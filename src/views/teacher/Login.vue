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
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input id="email" v-model="form.email" type="text" class="form-control" placeholder="EMAIL" />
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
            <transition name="fade" mode="out-in">
              <div v-if="loading" key="loading" class="spinner-border" style="height: 24px; width: 24px" role="status">
                <span class="sr-only"></span>
              </div>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { required, digits } from 'vee-validate/dist/rules';
import { authStore, userStore } from '@/store';
import { Component, Vue } from 'vue-property-decorator';
import { ITeacherSignin, IUser, User } from '@/type';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class TLogin extends Vue {
  form: ITeacherSignin = new User();

  async onSubmit() {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;

    // teacher singin
    authStore
      .signinTeacher(this.form)
      .then((resp) => {
        this.$swal({
          icon: 'success',
          title: 'เข้าสู่ระบบ'
        }).then(() => {
          this.$router.push({ name: 'TMember' });
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'error',
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          text: err.response ? err.response?.data.MESSAGE : err.message
        });
      });
  }
}
</script>
