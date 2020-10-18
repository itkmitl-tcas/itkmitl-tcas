<template>
  <div class="progress-container">
    <div class="wrapper w-100 d-flex justify-content-between">
      <div class="line">
        <div class="i"></div>
      </div>
      <div
        class="px-2 px-sm-3 bg-white position-relative"
        v-for="(step, key) in steps"
        :key="`step-${key}`"
      >
        <div class="d-flex align-items-center flex-row">
          <div class="circle mr-3" :class="{ active: currentStep == key + 1 }">
            <span v-if="step.checked" class="h2 m-0">
              <b-icon-check-2></b-icon-check-2>
            </span>
            <span v-else>
              {{ key + 1 }}
            </span>
          </div>
          <div
            class="text d-flex flex-column"
            :class="{ active: currentStep == key + 1 || step.checked }"
          >
            <b>ขั้นที่ {{ key + 1 }}</b>
            <span>{{ step.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  data() {
    return {
      currentStep: 1,
      steps: [
        {
          active: false,
          checked: false,
          text: "ข้อมูลผู้สมัคร"
        },
        {
          active: false,
          checked: false,
          text: "อัปโหลดเอกสาร"
        },
        {
          active: false,
          checked: false,
          text: "อัปโหลดผลงาน"
        },
        {
          active: false,
          checked: false,
          text: "เสร็จสิ้น"
        }
      ]
    };
  },
  mounted() {
    // init current step in first visit
    this.setCurrentStep(this.$router.currentRoute);
  },
  methods: {
    setCurrentStep(route) {
      const step = route.matched.filter(record => record.meta.step);
      this.currentStep = step[0] ? step[0].meta.step : 1;
    }
  },
  watch: {
    // update current step when route update
    $route(to) {
      this.setCurrentStep(to);
    }
  }
};
</script>
