<template>
  <div class="content-container content bg-white mt-3">
    <div class="row">
      <div class="col">
        <div class="font-weight-bold">ประเมินผลงานนักศึกษา</div>

        <label style="font-size: 13px">กรุณาเลือกจำนวนที่ต้องการก่อนเริ่มการประเมิน</label>
        <div class="">
          <div v-if="!selected" class="mt-2 d-flex justify-content-center ">
            <input v-model="amount" class="form-control form-control-sm w-25" placeholder="จำนวนที่ต้องประเมิน" />
          </div>
          <div class="d-flex justify-content-center ">
            <button v-if="!selected" class="btn btn-primary btn-sm w-25" @click="assessment(amount)">
              เริ่มการประเมิน
            </button>
          </div>
        </div>
        <hr />
      </div>

      <div v-if="selected" class="col-12">
        <TContent :student-prop="selected" />
        <hr />
      </div>
      <div v-if="selected" class="col-12 d-flex justify-content-center">
        <input v-model="score" class="form-control w-25 text-center" placeholder="คะแนน" />
      </div>
      <div v-if="selected" class="col-12  d-flex justify-content-center mt-3 ">
        <button class="btn btn-success w-25" @click="onSave()">บันทึก</button>
      </div>
      <div v-if="selected" class="col-12  d-flex justify-content-center mt-3 ">
        <button class="btn btn-secondary w-25" @click="prev()">หน้าที่แล้ว</button>
      </div>
      <div v-if="selected" class="col-12  d-flex justify-content-center mt-3 mb-5">
        {{ index + 1 }} / {{ assessments.data.DATA.length }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import env from '@/environment';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { userStore } from '@/store';
import { User } from '@/type/index';
import TContent from '@components/TContent.vue';

@Component({
  name: 'TeacherAssessment',
  components: {
    TContent
  },
  data() {
    return {
      selected: {},
      assessments: {},
      student: {},
      index: 0
    };
  }
})
export default class SAssessment extends Vue {
  loading = false;
  assessments: any;
  amount = 45;
  $env: any;
  $axios: any;
  score = '';
  selected: any;
  student: any;
  index: any;

  async created() {
    this.assessments = await this.$axios.get(`${this.$env.BACK_URI}/assessment`);
    this.selected = this.assessments.data.DATA[0];
    this.score = this.selected.assessments[0].score;
  }

  async assessment(amount) {
    this.assessments = await this.$axios.post(`${this.$env.BACK_URI}/assessment/start`, { amount: amount });
    this.selected = this.assessments.data.DATA[0];
    this.score = this.selected.assessments[0].score;
  }

  async onSave() {
    const payload = {
      score: this.score,
      assessee_id: this.selected.apply_id
    };
    await this.$axios.post(`${this.$env.BACK_URI}/assessment`, payload).then(() => {
      this.index = this.assessments.data.DATA.findIndex((item) => item.apply_id == this.selected.apply_id);
      console.log(this.assessments.data.DATA[this.index + 1]);
      this.selected = this.assessments.data.DATA[this.index + 1] || this.assessments.data.DATA[0];
      this.score = this.selected.assessments[0].score;
    });
  }

  async prev() {
    // this.index = this.assessments.data.DATA.findIndex((item) => item.apply_id == this.selected.apply_id);
    if (this.index - 1 < 0) {
      this.selected = this.assessments.data.DATA[this.assessments.data.DATA.length];
    } else {
      this.index -= 1;
    }
    this.selected = this.assessments.data.DATA[this.index];
    this.score = this.selected.assessments[0].score;
    // this.selected =
    //   this.assessments.data.DATA[this.index - 1] || this.assessments.data.DATA[this.assessments.data.DATA.length];
    // this.score = this.selected.assessments[0].score;
    // console.log(this.index);
    // if (this.index - 1 < 0) {
    //   this.selected = this.assessments.data.DATA[this.assessments.data.DATA.length];
    // }
  }

  // @Watch('selected')
  // async onChange(data) {
  //   this.student = data;
  //   console.log(data);
  // }

  fields: Record<string, any>[] = [
    {
      key: 'apply_id',
      sortable: true,
      label: 'ไอดี'
    },
    {
      key: 'full_name',
      sortable: false,
      label: 'ชื่อ'
    },
    {
      sortable: false,
      key: 'button',
      label: ''
    }
  ];
}
</script>

<style scoped lang="scss">
object {
  min-height: 50vh;
  width: 100%;
}
</style>
