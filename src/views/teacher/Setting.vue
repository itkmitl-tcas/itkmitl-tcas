<template>
  <div class="content-container content bg-white mt-3">
    <!-- <div class="row">
      <div class="col font-weight-bold">
        ตั้งค่าระบบ
      </div>
    </div> -->
    <!-- <hr /> -->

    <div class="wrapper">
      <div class="font-weight-bold">ตั้งค่าการสมัคร</div>
      <hr />
      <div
        class="d-flex flex-row align-items-center justify-content-center py-5 rounded text-light"
        style="background: linear-gradient(-45deg, #0889ff, #023145)"
      >
        <small>ปิดการรับสมัคร</small>
        <label class="switch mx-2 mx-md-3 my-0">
          <input v-model="client_access" type="checkbox" checked />
          <span class="slider round"></span>
        </label>
        <small>เปิดการรับสมัคร</small>
      </div>
      <div class="btn btn-success mt-2 w-100" @click="onSave()">บันทึก</div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component({
  name: 'TeacherSetting'
})
export default class SSetting extends Vue {
  client_access = true;
  $axios: any;
  $env: any;

  mounted() {
    this.$axios.get(`${this.$env.BACK_URI}/setting`).then((resp) => {
      this.client_access = resp.data.DATA.value;
    });
  }

  onSave() {
    const payload = {
      name: 'client-access',
      value: this.client_access
    };
    this.$swal({
      icon: 'warning',
      title: 'ยันยันการเปลี่ยนแปลง',
      text: 'คุณต้องการเปลี่ยนสถาณะการรับสมัครหรือใหม่',
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#28a745'
    }).then((result) => {
      if (result.isConfirmed) {
        this.$axios.post(`${this.$env.BACK_URI}/setting`, payload).then(() => {
          this.$swal({
            icon: 'success',
            title: 'บันทึก',
            text: `บันทึกสถาณะการรับสมัครเป็น ${this.client_access} แล้ว`
          });
        });
      }
    });
  }
}
</script>

<style lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
