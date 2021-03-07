<template>
  <div class="theader-container">
    <div class="w-100">
      <div class="row ">
        <div class="col-6 col-md h-100">
          <router-link
            :to="{ name: 'TMain' }"
            type="button"
            class="btn btn-sm border border-primary w-100"
            active-class="btn-primary text-white"
          >
            จัดการผู้สมัคร
          </router-link>
        </div>
        <div class="col-6 col-md h-100">
          <router-link
            :to="{ name: 'TAudit' }"
            type="button"
            class="btn btn-sm border border-primary w-100"
            active-class="btn-primary text-white"
          >
            ประเมินผลงาน
          </router-link>
        </div>
        <div class="col-6 col-md h-100">
          <router-link
            :to="{ name: 'TMember' }"
            type="button"
            class="btn btn-sm border border-primary w-100"
            active-class="btn-primary text-white"
          >
            จัดการอาจารย์
          </router-link>
        </div>
        <div class="col-6 col-md">
          <router-link
            :to="{ name: 'TSetting' }"
            type="button"
            class="btn btn-sm border border-primary w-100"
            active-class="btn-primary text-white"
          >
            ตั้งค่า
          </router-link>
        </div>
        <div class="col-6 col-md">
          <router-link
            :to="{ name: 'TCriteria' }"
            type="button"
            class="btn border btn-sm border-primary w-100"
            active-class="btn-primary text-white"
          >
            เกณฑ์ผลงาน
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
