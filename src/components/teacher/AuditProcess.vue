<template>
  <div class="wrapper">
    <div class="d-flex flex-row justify-content-between">
      <div class="font-weight-bold">ประเมินผลงานนักศึกษา</div>
      <div class="text-primary font-weight-bold ml-2" style="cursor: pointer" @click="$emit('mode', 'select')">
        ย้อนกลับ
      </div>
    </div>
    <hr />

    <div class="row mt-3">
      <div id="view-table2" class="col-12">
        <b-table
          ref="viewTable2"
          selectable
          :items="mappingData"
          :fields="fields2"
          :busy="loadingMapping"
          sticky-header
          borderless
          striped
          show-empty
          small
          responsive="sm"
          selected-variant="secondary"
          select-mode="single"
          @row-selected="onAuditSelect"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #table-busy>
            <div class="text-center text-primary my-2">
              <div class="spinner-border" style="height: 24px; width: 24px" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </template>
          <template #empty="">
            <div class="text-center p-3">
              ยังไม่มีข้อมูลนักศึกษาที่จับคู่กับอาจารย์
            </div>
          </template>
        </b-table>
      </div>
    </div>
    <AuditStep1 :student-data="selectedStudent" @grade-score="updateGradeScore" />
    <AuditStep2 :student-data="selectedStudent" @port-score="updatePortScore" />

    <div class="row mt-3 ">
      <div class="col-12 font-weight-bold">
        <b-icon-award class="text-primary" /> ให้คะแนน
        <hr />
      </div>
    </div>
    <form @submit.prevent="onSubmit">
      <table>
        <tr>
          <td>
            คะแนนผลการเรียน:
          </td>
          <td class="pl-2">
            <b-input v-model="gradeScore" class="text-success" size="sm"></b-input>
          </td>
        </tr>
        <tr>
          <td>
            คะแนนผลงาน
          </td>
          <td class="pl-2">
            <b-input v-model="portScore" class="text-success" size="sm"></b-input>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="pt-3"></td>
        </tr>
      </table>

      <b-button type="submit" variant="success" class="m-0 w-100 mb-2">ประเมินและบันทึก</b-button>
    </form>
  </div>
</template>

<script lang="ts">
import AuditSelect from '@components/teacher/AuditSelect.vue';
import AuditStep1 from '@components/teacher/step/AuditStep1.vue';
import AuditStep2 from '@components/teacher/step/AuditStep2.vue';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '@/type/index';
import { userStore, auditStore } from '@/store';

@Component({
  components: {
    AuditStep1,
    AuditStep2
  }
})
export default class AuditProcess extends AuditSelect {
  @Prop() mode!: string;
  mappingData: User[] = [];
  selectedStudent: User = new User();
  fetchMapping: any;
  $refs: any;
  gradeScore = 0;
  portScore = 0;
  loadingMapping!: boolean;

  created() {
    this.fetchMapping(userStore.DATA_USER.apply_id).then((resp) => {
      if (!resp.length) return this.$emit('mode', 'select');
      this.$refs.viewTable2.selectRow(0);
      this.loadingMapping = false;
    });
  }

  /* ---------------------------------- Watch --------------------------------- */
  @Watch('selectedStudent')
  async selectedStudentEmpty(data) {
    if (!data) {
      this.selectedStudent = this.mappingData[0];
      this.$refs.viewTable2.selectRow(0);
    }
  }

  /* --------------------------------- Methods -------------------------------- */
  onAuditSelect(student) {
    this.selectedStudent = student[0];
  }

  updateGradeScore(score) {
    this.gradeScore = score;
  }
  updatePortScore(score) {
    this.portScore = score;
  }

  onSubmit() {
    auditStore
      .submitAudit({ student_id: this.selectedStudent.apply_id, score: this.portScore + this.gradeScore })
      .then((resp) =>
        this.fetchMapping(userStore.DATA_USER.apply_id).then((resp) => {
          if (!resp.length) return this.$emit('mode', 'select');
          this.loadingMapping = false;
          this.$refs.viewTable2.selectRow(0);
        })
      );
  }
}
</script>
