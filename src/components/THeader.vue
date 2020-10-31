<template>
  <div class="theader-container">
    <div class="wrapper w-100">
      <div class="row">
        <div class="col-12 col-md">
          <router-link
            :to="{ name: 'TMember' }"
            type="button"
            class="btn border border-primary w-100"
            active-class="btn-primary text-white"
          >
            จัดการผู้ใช้
          </router-link>
        </div>
        <div class="col-12 col-md">
          <router-link
            :to="{ name: 'TSetting' }"
            type="button"
            class="btn border border-primary w-100"
            active-class="btn-primary text-white"
          >
            ตั้งค่าการสมัคร
          </router-link>
        </div>
        <!-- <div class="col-12 col-md">
          <router-link
            :to="{ name: 'TMain' }"
            type="button"
            active-class="btn-primary text-white"
            class="btn border border-primary w-100"
          >
            หน้าหลัก
          </router-link>
        </div> -->
        <div class="col-12 col-md">
          <router-link
            :to="{ name: 'TMember' }"
            type="button"
            class="btn border border-primary w-100"
            active-class="btn-primary text-white"
          >
            จัดการเกณฑ์ผลงาน
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a,
a:hover {
  color: #0889ff;
}
</style>
