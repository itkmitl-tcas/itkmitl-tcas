<template>
  <div class="header-container">
    <div class="py-4 container-xl">
      <div class="d-flex flex-row align-items-center">
        <img v-lazy="require('@images/logo.png')" class="mr-3" />
        <div class="d-md-flex flex-column d-none">
          <div class="title" style="color: #d9d9d9">
            Faculty of Information Technology
          </div>
          <div class="text-muted subtitle">
            King Mongkut's Institute of Technology Ladkrabang
          </div>
        </div>
        <div v-if="DATA_USER.pay" class="flex-grow-1 text-right">
          <div class="title" style="color: #d9d9d9">
            {{ DATA_FULL_NAME }} {{ DATA_USER.apply_id }}
            <router-link v-if="DATA_USER.permission >= 2" :to="{ name: 'TMain' }">
              <span class="text-primary">({{ mapPermission(DATA_USER.permission) }})</span>
            </router-link>
            <span v-else class="text-primary">({{ mapPermission(DATA_USER.permission) }})</span>
          </div>
          <div class="link title text-white-50 font-weight-light" @click="signOut(DATA_USER.permission)">
            ออกจากระบบ
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userStore } from '@/store';

export default {
  name: 'Header',
  computed: {
    DATA_USER: () => userStore.DATA_USER,
    DATA_FULL_NAME: () => userStore.DATA_FULL_NAME
  },
  methods: {
    signOut(permission) {
      axios.post(`${this.$env.BACK_URI}/auth/signout`).then(() => {
        this.$swal({
          icon: 'success',
          title: 'ออกจากระบบ'
        }).then(() => {
          userStore.RESET_USER();
          if (permission == 1) {
            this.$router.push({
              name: 'SLogin'
            });
          } else {
            this.$router.push({
              name: 'TLogin'
            });
          }
        });
      });
    },
    mapPermission(permission) {
      if (permission == 1) {
        return 'นักศึกษา';
      } else if (permission == 2) {
        return 'อาจารย์';
      } else if (permission == 3) {
        return 'ผู้ดูแล';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 70px;

  img {
    width: 40px;
  }

  .title {
    font-size: 13px;
  }

  .subtitle {
    font-size: 10px;
  }

  .link {
    cursor: pointer;
    transition: 0.3s ease-out;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
