<template>
  <div class="dashboard-container">
    <div class="container">
      <Progress class="" />
      <div class="content bg-white mt-3">
        <transition name="fade" mode="out-in">
          <router-view class="px-2 px-sm-3 mt-2" key="steps" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "@components/Progress.vue";

export default {
  name: "SDashboard",
  components: {
    Progress
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 5rem;
}
</style>
