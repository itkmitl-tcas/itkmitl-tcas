<template>
  <div class="audit-container content bg-white mt-3 px-2 px-sm-3 px-md-4">
    <div class="wrapper">
      <div class="font-weight-bold">ประเมินผลงานนักศึกษา</div>
      <hr />
      <div class="row mt-3">
        <!-- Student search -->
        <div class="col-12 mb-3">
          <input
            v-model="studentSearch"
            name="search"
            type="text"
            class="form-control"
            placeholder="ค้นหานักศึกษา (รหัสนักศึกษา, ชื่อ, นามสกุล, โครงการ)"
          />
        </div>

        <!-- Students table -->
        <div id="student-table" class="col-6 ">
          <div id="student-title" class="text-center text-primary font-weight-bold mb-3">
            นักศึกษา <b-icon icon="question-circle-fill" variant="primary" />
          </div>
          <b-tooltip target="student-title" placement="bottom">เลือกนักศึกษาที่ต้องการ เพื่อจับคู่กับอาจารย์</b-tooltip>
          <b-table
            ref="studentTable"
            hover
            :items="students"
            :fields="fields"
            :busy="loading"
            sticky-header
            selectable
            borderless
            striped
            show-empty
            responsive="sm"
            @row-selected="onStudentSelect"
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
                ไม่พบนักศึกษา
              </div>
            </template>
          </b-table>
        </div>

        <!-- Teachers table -->
        <div id="teacher-table" class="col-6">
          <div id="teacher-title" class="text-center text-primary font-weight-bold mb-3">
            อาจารย์ <b-icon icon="question-circle-fill" variant="primary" />
          </div>
          <b-tooltip target="teacher-title" placement="bottom"
            >ระดับการเข้าถึง "ผู้ดูแล"
            จะสามารถจับคู่การประเมินระหว่างนักศึกษากับอาจารย์ท่านอื่นได้โดยเลือกอาจารย์ที่ต้องการ, ระดับการเข้าถึง
            "อาจารย์" จะถูกล็อกให้จับคู่การประเมินระหว่างตัวท่านเองกับนักศึกษา</b-tooltip
          >
          <b-table
            id="teacher-table"
            ref="teacherTable"
            :hover="userData.permission == 3 ? true : false"
            :items="teachers"
            :fields="fields"
            :busy="loading"
            sticky-header
            selectable
            borderless
            striped
            select-mode="single"
            responsive="sm"
            selected-variant="success"
            :no-select-on-click="userData.permission == 3 ? false : true"
            @row-selected="onTeacherSelect"
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
          </b-table>
        </div>

        <div class="col-12">
          <hr />
        </div>
        <!-- View table -->
        <div id="view-table" class="col-12">
          <div id="teacher-title" class="text-center text-primary font-weight-bold mb-3">
            รายการที่ต้องประเมิน
          </div>
          <b-table
            ref="viewTable"
            selectable
            :items="mappingData"
            :fields="fields2"
            :busy="loadingMapping"
            sticky-header
            borderless
            striped
            show-empty
            responsive="sm"
            selected-variant="secondary"
            small
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
        <div class="col-12">
          <hr />
        </div>
        <div class="col-12 pb-4">
          <div class="d-flex justify-content-center submit">
            <span id="mapping-btn">
              <b-btn variant="success" :disabled="studentSelected.length ? false : true" @click="submitMapping"
                >จับคู่</b-btn
              >
            </span>
            <span id="audit-btn">
              <b-btn variant="success" :disabled="auditDisable">เริ่มประเมิน</b-btn>
            </span>
            <b-tooltip target="mapping-btn" placement="top">จับคู่ระหว่างนักศึกษาและอาจารย์</b-tooltip>
            <b-tooltip target="audit-btn" placement="top"
              >ทำการประเมินผลงานนักศึกษาจากรายการที่ท่านจับคู่ไว้ (จำเป็นต้องจับคู่ก่อน)</b-tooltip
            >
          </div>
        </div>
        <div class="col-6"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { auditStore, userStore } from '@/store';
import { User } from '@/type/index';
import { Method } from 'axios';

/**
 * Audit process
 * - load all students in current year
 * - load all teachers
 * - create two table left, right
 * - left for students, right for teachers
 * - mapping students(left) and teachers(right)
 * - mapping
 * - start auditing
 */

@Component
export default class Audit extends Vue {
  $refs: any;
  /* -------------------------------- Varaible -------------------------------- */
  loading = true;
  loadingMapping = true;
  students: User[] = [];
  teachers: User[] = [];
  studentSelected: User[] = [];
  teacherSelected: User[] = [];
  mappingData: User[] = [];
  studentSearch = '';
  delayTimer;
  auditDisable = true;
  filter = {
    // student filter
    search: '',
    year: new Date().getFullYear(),
    step: null,
    audit_step: 0
  };
  fields = [
    // table fields
    {
      key: 'index',
      label: 'ลำดับ'
    },
    {
      key: 'apply_id',
      label: 'รหัส'
    },
    {
      key: 'full_name',
      label: 'ชื่อ - นามสกุล'
    }
  ];
  fields2 = [
    // table fields
    {
      key: 'index',
      label: 'ลำดับ'
    },
    {
      key: 'apply_id',
      label: 'รหัส'
    },
    {
      key: 'full_name',
      label: 'ชื่อ - นามสกุล'
    },
    {
      key: 'apply_type',
      label: 'โครงการ'
    }
  ];

  /* -------------------------------- Computed -------------------------------- */
  get userData() {
    return userStore.DATA_USER;
  }

  /* --------------------------------- Methods -------------------------------- */
  private delay = (func, delay = 300) => {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(func, delay);
  };

  onStudentSelect(items) {
    this.studentSelected = items;
  }
  onTeacherSelect(items) {
    this.teacherSelected = items;
  }
  onAuditSelect(item) {
    this.$swal({
      confirmButtonColor: '#d9534f',
      confirmButtonText: `ลบ`,
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
      focusCancel: true,
      icon: 'warning',
      title: 'ยืนยันลบรายการประเมิน',
      text: `ลบรายการที่ต้องประเมินของนักศึกษารหัส ${item[0].apply_id}`
    }).then(async (result) => {
      if (result.isConfirmed) {
        auditStore
          .delMapping(item[0].apply_id)
          .then(() => {
            this.$swal('ลบรายการ', '', 'success');
            this.fetchStudents().catch(() => (this.students = []));
            this.fetchMapping(this.teacherSelected[0].apply_id || 0);
          })
          .catch((err) =>
            this.$swal(
              'ไม่สามารถลบรายการได้',
              `เกิดข้อผิดพลาดในการลบรายการจับคู่กรุณาติดต่อผู้ดูแลระบบ <hr/> ${err.message}`,
              'error'
            )
          );
      }
    });
  }

  private async fetchStudents() {
    return new Promise<User[]>((resolve, reject) => {
      userStore
        .getStudent(this.filter)
        .then((students) => {
          this.students = students.map((item) => {
            item['full_name'] = `${item.prename}${item.name} ${item.surname}`;
            return item;
          });
          resolve(students);
        })
        .catch((err) => {
          if (err.response.status != 404) {
            this.$swal(
              'ไม่สามารถดึงข้อมูลผู้สมัครได้',
              'กรุณาออกและเข้าสู่ระบบใหม่ ถ้าไม่สามารถใช้งานได้กรุณาติดต่อผู้ดูแลระบบ',
              'warning'
            );
          }
        });
    });
  }

  private async fetchTeachers() {
    return new Promise<User[]>((resolve, reject) => {
      userStore
        .getTeacher()
        .then((teachers) => {
          this.teachers = teachers.map((item) => {
            item['full_name'] = `${item.prename}${item.name} ${item.surname}`;
            return item;
          });

          resolve(teachers);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            this.$swal('ไม่พบข้อมูลที่ต้องการ', 'ไม่พบผลการค้นหาที่ต้องการ', 'warning');
          } else {
            this.$swal(
              'ไม่สามารถดึงข้อมูลผู้สมัครได้',
              'กรุณาออกและเข้าสู่ระบบใหม่ ถ้าไม่สามารถใช้งานได้กรุณาติดต่อผู้ดูแลระบบ',
              'warning'
            );
          }
          resolve(err);
        });
    });
  }

  private fetchMapping(teacher_id) {
    return new Promise<User[]>((resolve, reject) => {
      auditStore
        .getMapping(teacher_id)
        .then((resp: any) => {
          // map student from mapping data
          this.mappingData = resp.data.DATA.map((map) => map.user);

          // inject fullname
          this.mappingData = this.mappingData.map((item) => {
            item['full_name'] = `${item.prename}${item.name} ${item.surname}`;
            return item;
          });

          resolve(this.mappingData);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            this.mappingData = [];
          } else {
            this.$swal(
              'ไม่สามารถดึงข้อมูลการจับคู่ได้',
              'กรุณาออกและเข้าสู่ระบบใหม่ ถ้าไม่สามารถใช้งานได้กรุณาติดต่อผู้ดูแลระบบ',
              'warning'
            );
          }
          reject(err);
        });
    });
  }

  public async submitMapping() {
    this.$swal({
      confirmButtonColor: '#28a745',
      confirmButtonText: `จับคู่`,
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
      focusCancel: true,
      icon: 'warning',
      title: 'ยืนยันการจับคู่',
      text: `ถ้ามีรายการประเมินอยู่แล้ว การจับคู่จะเพิ่มรายการที่ต้องประเมิน`
    }).then(async (result) => {
      if (result.isConfirmed) {
        auditStore
          .mapping({ students: this.studentSelected, teacher: this.teacherSelected })
          .then((resp: any) => {
            this.fetchStudents().catch(() => (this.students = []));
            this.fetchMapping(this.teacherSelected[0].apply_id || 0);

            // remove selected student
            this.$swal({
              icon: 'success',
              title: 'ทำการจับคู่เสร็จสิ้น',
              text: `ท่านสามารถเริ่มทำการประเมินนักศึกษาที่ทำการจับคู่ได้แล้ว `
            });
          })
          .catch((err) => {
            this.$swal({
              html: `อาจารย์ท่านอื่นจับคู่กับนักศึกษาท่านแล้วนี้ เพิ่มเติม <hr/> ${err.response.data.MESSAGE}`,
              icon: 'error',
              title: `ไม่สามารถทำการจับคู่ได้`
            }).then(() => {
              // update student
              this.loading = true;
              this.fetchStudents().catch(() => (this.students = []));
              this.delay(() => (this.loading = false));
            });
          });
      }
    });
  }

  public updateAuditDisable() {
    this.auditDisable =
      this.mappingData.length && this.userData.apply_id == this.teacherSelected[0].apply_id ? false : true;
  }

  /* ---------------------------------- Watch --------------------------------- */

  @Watch('studentSearch')
  onSearch(search) {
    this.delay(() => {
      // update search filter
      this.filter.search = search;
      this.$refs.studentTable.clearSelected();
    }, 800);
  }

  @Watch('filter', { deep: true })
  async onFilterChange() {
    // update students
    this.loading = true;
    await this.fetchStudents().catch(() => (this.students = []));
    this.delay(() => (this.loading = false));
  }

  @Watch('mappingData')
  onMappingDataChange() {
    this.loadingMapping = true;
    this.delay(() => (this.loadingMapping = false));
  }

  @Watch('teacherSelected', { deep: true })
  async onTeacherSelectedChange() {
    // when admin not click any teacher
    if (this.teacherSelected.length) {
      // fetch mapping list
      await this.fetchMapping(this.teacherSelected[0].apply_id)
        .then(() => {
          this.updateAuditDisable();
        })
        .catch(() => {
          this.updateAuditDisable();
        });
    } else {
      this.auditDisable = true;
      this.mappingData = [];
    }
  }

  async created() {
    // Load all students in current year
    this.fetchStudents().catch(() => (this.students = []));

    //Load all teachers
    await this.fetchTeachers().then((teachers) => {
      // find teachers index
      const target = teachers.findIndex((teacher) => teacher.apply_id == this.userData.apply_id);
      this.$refs.teacherTable.selectRow(target);
      // // can add everyone
      // if (this.userData.permission === 3) {
      //   // select first index
      //   this.$refs.teacherTable.selectRow(0);
      // } else {
      //   const target = teachers.findIndex((teacher) => teacher.apply_id == this.userData.apply_id);
      //   this.$refs.teacherTable.selectRow(target);
      // }
    });

    setTimeout(() => {
      this.loading = false;
    }, 300);
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
.table {
  thead th {
    background-color: #0889ff !important;
    color: #fff !important;
    &:first-child {
      border-top-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
    }
  }
}

#student-table,
#teacher-table,
#view-table {
  .b-table-sticky-header {
    box-shadow: 0 1px 5px 0px rgba($color: #000000, $alpha: 0.3);
    border-radius: 10px;

    @include media-breakpoint-down(sm) {
      font-size: 12px;

      th:not(:last-child),
      td:not(:last-child) {
        display: none;
      }
    }
  }
}

#student-table,
#teacher-table {
  .b-table-sticky-header {
    min-height: calc(40vh);
    max-height: calc(40vh);
  }
}

#view-table {
  .b-table-sticky-header {
    min-height: calc(20vh);
    max-height: calc(20vh);
  }
}

.audit-container {
  .btn {
    width: 150px;
    &:first-child {
      margin-right: 15px;
    }
    &:last-child {
      margin-left: 15px;
    }
  }

  @include media-breakpoint-down(sm) {
    #student-table {
      padding-right: 8px;
    }
    #teacher-table {
      padding-left: 8px;
    }
    #mapping-btn,
    #audit-btn {
      width: 100%;
      display: block;
      &:first-child {
        margin-right: 15px;
      }
      &:last-child {
        margin-left: 15px;
      }
      .btn {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
