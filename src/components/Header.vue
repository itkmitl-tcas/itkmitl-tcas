<template>
  <div class="header-container">
    <div class="px-4 py-3">
      <div class="d-flex flex-row align-items-center">
        <img v-lazy="require('@images/logo.png')" class="mr-3" />
        <div class="d-flex flex-column">
          <div class="text-white-50 title">
            Faculty of Information Technology
          </div>
          <div class="text-muted subtitle">
            King Mongkut's Institute of Technology Ladkrabang
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
}
</style>
