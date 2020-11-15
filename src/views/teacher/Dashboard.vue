<template>
  <div class="dashboard-container d-flex">
    <div class="container-xl">
      <THeader />
      <div>
        <transition name="fade" mode="out-in">
          <router-view key="steps" class="px-2 px-sm-3 mt-md-4" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import THeader from '@components/THeader.vue';
import UserMix from '@/mixin/user';
import { userStore, portfolioStore } from '@/store';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'TeacherDashboard',
  components: {
    THeader
  }
})
export default class SDashboard extends Vue {}
</script>

<style lang="scss" scoped>
.content {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 5rem;
}
</style>
