<template>
  <div class="student-container">
    <transition name="fade" mode="out-in">
      <router-view key="student" />
    </transition>
  </div>
</template>
