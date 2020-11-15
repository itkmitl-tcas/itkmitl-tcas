<template>
  <div id="app">
    <router-view name="header" />
    <router-view name="body" class="visable" />
    <router-view name="footer" />
  </div>
</template>

<style lang="scss">
@import '@scss/main';
</style>
