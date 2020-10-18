<template>
  <div class="dashboard-container">
    <div class="container">
      <Progress class="" />
      <div class="content bg-white mt-3">
        <router-view class="px-2 px-sm-3 mt-2" />
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
}
</style>
