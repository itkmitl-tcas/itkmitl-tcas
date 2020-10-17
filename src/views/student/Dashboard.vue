<template>
  <div class="dashboard-container">
    <div class="container">
      <Progress class="" />
      <div class="content bg-white mt-3">
        <div class="px-2 px-sm-3">
          HIHI
        </div>
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

<style lang="scss">
.content {
  padding: 1rem;
  border-radius: 10px;
}
</style>
