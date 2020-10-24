<template>
  <div class="body-container bg-deep">
    <Header />
    <router-view class="position-relative" style="z-index: 1" />
    <img src="@images/footer.svg" class="w-100" />
  </div>
</template>

<script>
import Header from "@components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.body-container {
  min-height: 100vh;
  position: relative;

  img {
    position: absolute;
    bottom: 0;
  }
}
</style>
