<template>
  <div class="row mt-3">
    <div v-b-toggle="'audit-grade-collapse'" class="col-12 font-weight-bold">
      <b-icon-person class="text-primary" /> ประเมินคะแนนผลการเรียน <b-icon-chevron-down />
      <hr />
    </div>
    <b-collapse id="audit-grade-collapse" visible>
      <div v-if="studentData.apply_type == 'โครงการนักเรียนเรียนดีและมีความสนใจทางเทคโนโลยีสารสนเทศ'" class="col-12">
        <table class=" mb-4">
          <tr>
            <td style="min-width: 200px;">
              GPAX วิชาคณิตศาสตร์
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-secondary">{{ studentData.gpax_match || 0 }}</span>
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ gpax_math }}</span>
            </td>
          </tr>
          <tr>
            <td>
              GPAX วิชาภาษาต่างประเทศ
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-secondary">{{ studentData.gpax_eng || 0 }} </span>
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ gpax_eng }}</span>
            </td>
          </tr>
          <tr>
            <td>
              GPAX รวม:
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-secondary">{{ studentData.gpax || 0 }}</span>
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ gpax_all }}</span>
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">
              คะแนนรวม:
            </td>
            <td class="pl-3"></td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ grade_score }}</span>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="col-12 mb-4">
        <table>
          <tr>
            <td style="min-width: 200px;">
              GPAX รวม:
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-secondary">{{ studentData.gpax }}</span>
            </td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ gpax_all }}</span>
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">
              คะแนนรวม:
            </td>
            <td class="pl-3"></td>
            <td class="pl-3">
              <span class="font-weight-bold text-success">{{ grade_score }}</span>
            </td>
          </tr>
        </table>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '@/type/index';
import { auditStore } from '@/store';
@Component
export default class AuditStep1 extends Vue {
  @Prop() studentData!: User;
  gpax_math = 0;
  gpax_eng = 0;
  gpax_all = 0;
  grade_score = 0;

  /* ---------------------------------- Watch --------------------------------- */

  @Watch('studentData')
  async onStudentDataChange(data) {
    if (!this.studentData) return;
    auditStore.auditGrade(this.studentData).then((resp: any) => {
      this.gpax_math = resp.data.DATA.math;
      this.gpax_eng = resp.data.DATA.eng;
      this.gpax_all = resp.data.DATA.all;

      if (this.studentData.apply_type == 'โครงการนักเรียนเรียนดีและมีความสนใจทางเทคโนโลยีสารสนเทศ') {
        this.grade_score = this.gpax_math + this.gpax_eng + this.gpax_all;
      } else {
        this.grade_score = this.gpax_all;
      }

      this.$emit('grade-score', this.grade_score);
    });
  }
}
</script>
