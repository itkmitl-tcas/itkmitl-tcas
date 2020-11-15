<template>
  <div class="teacher-main-container">
    <form @submit.prevent="search">
      <div class="row mb-md-3 mb-3 search">
        <div class="col-12 col-md-3 pl-md-0 mb-2 mb-md-0">
          <input v-model="filters.search" type="text" class="form-control form-control-sm" placeholder="ค้นหา" />
        </div>
        <div class="col-12 col-md mb-2 mb-md-0">
          <b-form-select v-model="filters.year" size="sm" :options="yearOptions" style="border-radius: 5px;">
          </b-form-select>
        </div>
        <div class="col-12 col-md mb-2 mb-md-0">
          <b-form-select v-model="filters.step" size="sm" style="border-radius: 5px;">
            <option :value="null">กรองความคืบหน้าผู้สมัคร</option>
            <option :value="1">ขั้นที่ 1: กรอกข้อมูลผู้สมัคร</option>
            <option :value="2">ขั้นที่ 2: อัปโหลดเอกสาร</option>
            <option :value="3">ขั้นที่ 3: อัปโหลดผลงาน</option>
            <option :value="4">ขั้นที่ 4: เสร็จสิ้น</option>
          </b-form-select>
        </div>
        <div class="col-12 col-md pr-md-0 ">
          <button type="submit" class="btn btn-success btn-sm w-100">ค้นหา</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-12 col-md-3 pl-md-0">
        <div class="student-list-wrapper">
          <div class="bg-light rounded">
            <b-table
              hover
              :items="student"
              :fields="fields"
              :busy="loading"
              selectable
              borderless
              striped
              sticky-header
              select-mode="single"
              @row-clicked="triggerStudent"
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
        </div>
      </div>
      <div class="col pr-md-0">
        <div class="bg-white rounded pt-3">
          <TContent :student-prop="selectStudent" />
        </div>
      </div>
    </div>
    <!-- {{ student }} -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { userStore } from '@/store';
import { IUser, User } from '@/type/index';
import TContent from '@components/TContent.vue';

interface filters {
  search: string;
  year: number | null;
  step: number | null;
}

@Component({
  name: 'TeacherMain',
  components: {
    TContent
  }
})
export default class TMain extends Vue {
  loading = true;
  student: User[] = [new User()];
  selectStudent?: User = new User();
  filters: filters = {
    search: '',
    year: null,
    step: null
  };

  async created() {
    await userStore
      .getStudent(this.filters)
      .then((resp) => (this.student = resp))
      .catch((err) =>
        this.$swal(
          'ไม่สามารถดึงข้อมูลผู้สมัครได้',
          'กรุณาออกและเข้าสู่ระบบใหม่ ถ้าไม่สามารถใช้งานได้กรุณาติดต่อผู้ดูแลระบบ',
          'warning'
        )
      )
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
        this.yearOptions = this.convertDate();
      });
  }

  async search() {
    this.loading = true;
    await userStore
      .getStudent(this.filters)
      .then((resp) => (this.student = resp))
      .catch((err) => {
        this.selectStudent = undefined;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  // trigger student select
  triggerStudent(item, index, e) {
    this.selectStudent = item;
  }

  // inject full_name to teacher data
  @Watch('student')
  onChange(data) {
    data.map((item) => {
      item['full_name'] = `${item.prename}${item.name} ${item.surname}`;
      return item;
    });
    this.selectStudent = this.student[0];
  }

  // create year options
  yearOptions: Record<string, any>[] = [{ text: new Date().getFullYear(), value: new Date().getFullYear() }];
  convertDate() {
    const years: any = this.student
      .map((item: any) => new Date(item.createdAt).getFullYear())
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((item) => {
        return {
          value: item,
          text: item
        };
      });
    years.unshift({ value: null, text: 'ปีการศึกษา' });
    return years;
  }
  /* ---------------------------- data table fields --------------------------- */
  fields = [
    {
      key: 'index',
      label: 'ลำดับ'
    },
    {
      key: 'full_name',
      label: 'ชื่อ - นามสกุล'
    }
  ];
}
</script>

<style lang="scss">
.teacher-main-container {
  font-size: 13px;

  .student-list-wrapper {
    border-radius: 5px;
    box-shadow: 0 1px 5px 0px rgba($color: #000000, $alpha: 0.3);
  }
  .b-table-sticky-header {
    min-height: calc(97vh - 200px);
    max-height: calc(97vh - 200px);
  }
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
}
</style>
