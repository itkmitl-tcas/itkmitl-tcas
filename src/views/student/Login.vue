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
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="text"
                v-model="form.apply_id"
                class="form-control"
                id="apply_id"
                placeholder="รหัสประจำตัว"
              />
              <small class="form-text text-muted mt-1">รหัสประจำตัวผู้สมัคร จากสำนักทะเบียน</small>
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
              <input type="text" v-model="form.surname" class="form-control" id="surname" placeholder="นามสกุล" />
              <small class="form-text text-warning">{{ errors[0] }}</small>
            </ValidationProvider>
          </div>
          <button type="submit" class="btn btn-primary w-100 mt-4">
            <div class="spinner-border" style="height: 24px; width: 24px" role="status" v-if="loading">
              <span class="sr-only">Loading...</span>
            </div>
            <span v-else>
              เข้าสู่ระบบ
            </span>
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
import Store, { userStore } from '@/store';

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

    await this.$axios
      .post(`${this.$env.BACK_URI}/auth/signin`, {
        apply_id: parseInt(`${this.form.apply_id}`),
        name: this.form.name,
        surname: this.form.surname
      })
      .then((resp: AxiosResponse) => {
        const user = {
          apply_id: resp.data.DATA.apply_id,
          permission: resp.data.DATA.permission
        };
        userStore.UPDATE_USER(user);
        this.$swal({
          icon: 'success',
          title: 'เข้าสู่ระบบ',
          text: `ยินดีต้อนรับผู้สมัครหมายเลข ${this.form.apply_id}`
        }).then(() => {
          this.$router.push({
            name: 'Step1'
          });
        });
      })
      .catch((err: AxiosError) => {
        const resp: any = err.response;

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
            text: err.message
          });
        }
      });

    this.loading = false;
  }
}

// export default {
//   data() {
//     return {
//       form: {
//         id: 631001130,
//         name: "?????",
//         surname: "???????"
//       },
//       loading: false
//     };
//   },
//   components: {
//     ValidationProvider,
//     ValidationObserver
//   },
//   methods: {
//     onSubmit() {
//       this.$refs.form.validate().then(async (success) => {
//         if (!success) return;

//         this.loading = true;

//         await this.$axios
//           .post(`${this.$env.BACK_URI}/auth/signin`, {
//             apply_id: this.form.id,
//             name: this.form.name,
//             surname: this.form.surname
//           })
//           .then((resp) => {
//             const user = {
//               apply_id: resp.data.DATA.apply_id,
//               permission: resp.data.DATA.permisison
//             }
//             this.$store.update_user(user)
//             this.$swal({
//               icon: "success",
//               title: "เข้าสู่ระบบ",
//               text: `ยินดีต้อนรับผู้สมัครหมายเลข ${this.form.id}`
//             }).then(() => {
//               this.$router.push({
//                 name: "Step1"
//               });
//             });
//           })
//           .catch(err => {
//             this.$swal({
//               icon: "error",
//               title: "ไม่สามารถเข้าสู่ระบบได้",
//               text: err.message
//             });
//           });

//         this.loading = false;
//       });
//     }
//   }
// };
</script>
