<template>
  <div class="teacher-member-container content-container content bg-white mt-3">
    <div class="row">
      <div class="col d-flex align-items-center">
        <div class="font-weight-bold">จัดการอาจารย์</div>
      </div>
      <div class="col text-right">
        <button v-b-modal.add-modal class="btn btn-success btn-sm">เพิ่มอาจารย์</button>
      </div>
    </div>
    <hr />
    <!-- data table -->
    <b-table responsive striped hover :items="teacher" :fields="fields" @row-clicked="openTeacher"></b-table>

    <!-- Add teacher -->
    <b-modal
      id="add-modal"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      title="เพิ่มอาจารย์"
      size="lg"
      scrollable
      centered
    >
      <ValidationObserver ref="form">
        <form class="mt-3" @submit.prevent="onSave">
          <div class="form-group mt-4">
            <div class="row field-wrapper">
              <div class="col-12 col-md-12">
                <label class="subtitle font-weight-bold">คำนำหน้าชื่อ</label>
                <div class="d-flex flex-row">
                  <b-form-radio-group
                    id="prename"
                    v-model="addTeacher.prename"
                    :options="prename"
                    name="radio-options"
                  ></b-form-radio-group>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">ชื่อจริง:</label>
                  <input
                    id="name"
                    v-model="addTeacher.name"
                    name="name"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="ชื่อต้น"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">นามสกุล:</label>
                  <input
                    id="surname"
                    v-model="addTeacher.surname"
                    name="surname"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="นามสกุล"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|integer">
                  <label class="subtitle font-weight-bold">ไอดี:</label>
                  <input
                    id="apply_id"
                    v-model="addTeacher.apply_id"
                    name="apply_id"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="ไอดีเช่น 60070157"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|integer">
                  <label class="subtitle font-weight-bold">เบอร์โทรติดต่อ:</label>
                  <input
                    id="mobile"
                    v-model="addTeacher.mobile"
                    name="mobile"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="เบอร์โทร"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <label class="subtitle font-weight-bold">อีเมลล์:</label>
                  <input
                    id="email"
                    v-model="addTeacher.email"
                    name="email"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="อีเมลล์"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 mb-0">
                <hr />
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|confirmed:confirmation">
                  <label class="subtitle font-weight-bold">รหัสผ่าน:</label>
                  <input
                    id="password"
                    v-model="addTeacher.password"
                    name="password"
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="รหัสผ่าน"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required" vid="confirmation">
                  <label class="subtitle font-weight-bold">ยืนยันรหัสผ่าน:</label>
                  <input
                    id="confirm"
                    v-model="confirmation"
                    name="confirm"
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="ยืนยันรหัสผ่าน"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 text-center">
                <hr />
                <button
                  type="button"
                  class="btn border border-primary text-primary  px-5 mr-0 mr-md-3"
                  @click="$bvModal.hide('add-modal')"
                >
                  ยกเลิก
                </button>
                <button type="submit" class="btn btn-primary px-5">
                  <transition name="fade" mode="out-in">
                    <div
                      v-if="loading"
                      key="loading"
                      class="spinner-border"
                      style="height: 24px; width: 24px"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                    <span v-else key="message">
                      เพิ่มอาจารย์
                    </span>
                  </transition>
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { userStore } from '@/store';
import { IUser, User } from '@/type/index';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, integer, email, confirmed } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
extend('integer', {
  ...integer,
  message: 'ค่าต้องเป็นตัวเลขเท่านั้น'
});
extend('email', {
  ...email,
  message: 'ค่าต้องเป็นอีเมลล์'
});
extend('confirmed', {
  ...confirmed,
  message: 'รหัสผ่านจำเป็นเหมือนกัน'
});

@Component({
  name: 'TeacherMember',
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class TMember extends Vue {
  loading = false;
  /* --------------------------------- Teacher -------------------------------- */
  // teacher data
  teacher: User[] = [new User()];
  async created() {
    await userStore.getTeacher().then((resp) => (this.teacher = resp));
  }

  // inject full_name to teacher data
  @Watch('teacher')
  onChange(data) {
    data.map((item) => {
      item['full_name'] = `${item.prename}${item.name} ${item.surname}`;
      return item;
    });
  }

  /* ---------------------------------- Table --------------------------------- */
  // table fields
  fields: Record<string, any>[] = [
    {
      key: 'apply_id',
      sortable: true,
      label: 'ไอดี'
    },
    {
      key: 'full_name',
      sortable: true,
      label: 'ชื่อ'
    }
  ];

  /* ---------------------------------- Show Teacher --------------------------------- */
  selectTeacher: User = new User();
  openTeacher(item, index, e) {
    this.selectTeacher = item;
    this.$bvModal.show('teacher-modal');
  }

  /* ------------------------------- Add Teacher ------------------------------ */
  confirmation: any = '';
  addTeacher: User = new User();
  prename = [
    {
      text: 'นาย',
      value: 'นาย'
    },
    {
      text: 'นาง',
      value: 'นาง'
    },
    {
      text: 'นางสาว',
      value: 'นางสาว'
    }
  ];
  async onSave() {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;
    this.loading = true;

    // add default value to payload
    this.addTeacher['pay'] = true;
    this.addTeacher['step'] = 1;
    this.addTeacher['permission'] = 2;
    this.addTeacher['apply_id'] = parseInt(`${this.addTeacher['apply_id']}`);

    // request
    await userStore
      .upsertTeacher(this.addTeacher)
      .then(async (resp) => {
        await userStore.getTeacher().then((resp) => (this.teacher = resp));
        this.$swal({
          icon: 'success',
          title: 'เพิ่มอาจารย์',
          text: `เพิ่มอาจารย์รหัส ${this.addTeacher.apply_id} เสร็จสิ้น`
        }).then(() => {
          this.addTeacher = new User();
          this.$bvModal.hide('add-modal');
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'error',
          title: `ไม่สามารถเพิ่มอาจารย์รหัส ${this.addTeacher.apply_id} ได้`,
          text: `${err.response.data.DATA}`
        });
      });

    this.loading = false;
  }
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>
