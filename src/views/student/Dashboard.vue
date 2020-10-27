<template>
  <div class="dashboard-container d-flex">
    <div class="container">
      <Progress class="" />
      <div class="content bg-white mt-3">
        <transition name="fade" mode="out-in">
          <router-view key="steps" class="px-2 px-sm-3 mt-2" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Progress from '@components/Progress.vue';
import UserMix from '@/mixin/user';
import { userStore, portfolioStore } from '@/store';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  mixins: [UserMix],
  components: {
    Progress,
    ValidationProvider,
    ValidationObserver
  }
})
export default class SDashboard extends Vue {
  $axios: any;
  $env: any;

  async created() {
    await userStore.CALL_USER_DATA().catch((err) => {
      this.$swal({
        icon: 'error',
        title: 'ไม่สามารถดึงข้อมูลได้',
        text: `ไม่สามารถดึงข้อมูลผู้สมัครจากเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง`
      }).then(() => {
        this.$router.go(0);
      });
    });

    await portfolioStore.getPortType().catch((err) => {
      this.$swal({
        icon: 'error',
        title: 'ไม่สามารถดึงข้อมูลได้',
        text: `ไม่สามารถดึงข้อมูลผู้สมัครจากเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง`
      }).then(() => {
        this.$router.go(0);
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 5rem;
}
</style>
