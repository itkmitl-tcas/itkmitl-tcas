fwef<template>
  <div class="content-container criteria-container content bg-white mt-3 px-2 px-sm-3 px-md-4">
    <div class="row">
      <div class="col ">
        <div class="font-weight-bold">จัดการเกณฑ์ผลงาน</div>
        <label style="font-size: 13px">ประเภทของผลงานที่ผู้สมัครเลือกจะใช้ข้อมูลจากในตารางด้านล่างนี้</label>
        <hr />
      </div>
    </div>

    <!-- data table -->
    <div class="row mb-3">
      <div class="col d-flex align-items-center">
        <b-form-group label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              class="rounded"
              type="search"
              placeholder="ค้นหา"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="col text-right">
        <button v-b-modal.add-modal class="btn btn-success btn-sm">เพิ่มเกณฑ์</button>
      </div>
    </div>

    <b-table
      responsive="md"
      striped
      hover
      sortabl
      sortable
      :items="portType"
      :fields="fields"
      :filter="filter"
      @row-clicked="openCriteria"
    >
      <template #row-details="row">
        <div class="border px-2 py-3 bg-light rounded">
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </div>
      </template>
    </b-table>

    <!-- Edit Modal -->
    <b-modal
      id="edit-modal"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      title="แก้ไขเกณฑ์"
      size="lg"
      scrollable
      centered
    >
      <ValidationObserver ref="form">
        <form class="mt-3" @submit.prevent="onEdit">
          <div class="form-group mt-4">
            <div class="row field-wrapper">
              <div class="col-12 col-md-12">
                <label class="subtitle font-weight-bold">รหัส:</label>
                <input
                  id="criteria-id"
                  v-model="selectCriteria.type_id"
                  name="criteria-id"
                  type="text"
                  class="form-control form-control-sm"
                  readonly
                />
              </div>
              <div class="col-12 col-md-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">ไอดี:</label>
                  <input
                    id="criteria-name"
                    v-model="selectCriteria.name"
                    name="criteria-name"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="ไอดีเกณฑ์ภาษาอังกฤษ เช่น olympic, nsc, nstda"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">คำอธิบาย:</label>
                  <textarea
                    id="criteria-desc"
                    v-model="selectCriteria.desc"
                    rows="4"
                    name="criteria-desc"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="คำอธิบายเกณฑ์ จะปรากฎในตัวเลือกของผู้สมัครเมื่อเลือกประเภทผลงาน"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|integer">
                  <label class="subtitle font-weight-bold">คะแนน:</label>
                  <input
                    id="criteria-score"
                    v-model="selectCriteria.score"
                    name="criteria-score"
                    type="number"
                    class="form-control form-control-sm"
                    placeholder="คะแนนของเกณฑ์นี้ จะถูกใช้เพื่อคำนวนผลสรุป"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">กลุ่ม:</label>
                  <input
                    id="criteria-group"
                    v-model="selectCriteria.group"
                    name="criteria-group"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="กลุ่มที่แบ่งประเภทของเกณฑ์ เช่น โครงการโอลิมปิกวิชาการ"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 text-center">
                <hr />
                <button
                  type="button"
                  class="btn border border-primary text-primary  px-5 mr-0 mr-md-3"
                  @click="$bvModal.hide('edit-modal')"
                >
                  ยกเลิก
                </button>
                <button type="button" class="btn btn-danger  px-5 mr-0 mr-md-3" @click="removeCriteria()">
                  ลบ
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
                      แก้ไข
                    </span>
                  </transition>
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </b-modal>

    <!-- Add modal -->
    <b-modal
      id="add-modal"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      title="เพิ่มเกณฑ์"
      size="lg"
      scrollable
      centered
    >
      <ValidationObserver ref="form">
        <form class="mt-3" @submit.prevent="onSave">
          <div class="form-group mt-4">
            <div class="row field-wrapper">
              <div class="col-12 col-md-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">ไอดี:</label>
                  <input
                    id="criteria-name"
                    v-model="addCriteria.name"
                    name="criteria-name"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="ไอดีเกณฑ์ภาษาอังกฤษ เช่น olympic, nsc, nstda"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">คำอธิบาย:</label>
                  <textarea
                    id="criteria-desc"
                    v-model="addCriteria.desc"
                    rows="4"
                    name="criteria-desc"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="คำอธิบายเกณฑ์ จะปรากฎในตัวเลือกของผู้สมัครเมื่อเลือกประเภทผลงาน"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required|integer">
                  <label class="subtitle font-weight-bold">คะแนน:</label>
                  <input
                    id="criteria-score"
                    v-model="addCriteria.score"
                    name="criteria-score"
                    type="number"
                    class="form-control form-control-sm"
                    placeholder="คะแนนของเกณฑ์นี้ จะถูกใช้เพื่อคำนวนผลสรุป"
                  />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 col-md-6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">กลุ่ม:</label>
                  <input
                    id="criteria-group"
                    v-model="addCriteria.group"
                    name="criteria-group"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="กลุ่มที่แบ่งประเภทของเกณฑ์ เช่น โครงการโอลิมปิกวิชาการ"
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
                      เพิ่มเกณฑ์
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
import { portfolioStore } from '@/store';
import { IUser, User } from '@/type/index';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, integer } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});
extend('integer', {
  ...integer,
  message: 'ค่าต้องเป็นตัวเลข'
});

@Component({
  name: 'TeacherMember',
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class SCriteria extends Vue {
  portType: any = [];
  filter: any = null;
  addCriteria: any = {};
  selectCriteria: any = {};
  loading = false;
  fields = [
    { key: 'type_id', label: 'รหัส', sortable: true },
    { key: 'name', label: 'ไอดี' },
    { key: 'desc', label: 'คำอธิบาย' }
  ];

  async mounted() {
    this.portType = await portfolioStore.getPortType();
  }

  openCriteria(item, index, e) {
    this.selectCriteria = item;
    this.$bvModal.show('edit-modal');
  }
  removeCriteria() {
    this.$swal({
      icon: 'warning',
      title: 'ยืนยันการลบ',
      html: `ถ้าผู้สมัครเลือกประเภทผลงาน <b class="font-weight-bold">${this.selectCriteria.name}</b> ผู้สมัครจำเป็นต้องเลือกประเภทผลงานใหม่อีกรอบ ถ้าไม่ผลงานจะไม่ถูกนำมาคิดคะแนน`,
      showCancelButton: true,
      confirmButtonText: 'ลบเกณฑ์',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#dc3545'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = this.selectCriteria;
        portfolioStore
          .deletePortType(payload)
          .then(async () => {
            this.portType = await portfolioStore.getPortType();
            this.$swal({
              icon: 'success',
              title: 'ลบเกณฑ์',
              text: `ลบเกณฑ์ ${this.selectCriteria.name} เสร็จสิ้น`
            }).then(() => {
              this.selectCriteria = {};
              this.$bvModal.hide('edit-modal');
            });
          })
          .catch((err) => {
            this.$swal({
              icon: 'error',
              title: 'ไม่สามารถลบเกณฑ์ได้',
              text: `ไม่สามารถลบเกณฑ์ ${this.selectCriteria.name} ได้ \n ${err.response.DATA || err.message}`
            });
          });
      }
    });
  }

  async onSave() {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;
    this.loading = true;

    this.addCriteria['score'] = parseInt(`${this.addCriteria['score']}`);

    await portfolioStore
      .createPortType(this.addCriteria)
      .then(async () => {
        this.portType = await portfolioStore.getPortType();
        this.$swal({
          icon: 'success',
          title: 'เพิ่มเกณฑ์',
          text: `เพิ่มเกณฑ์ ${this.addCriteria.name} เสร็จสิ้น`
        }).then(() => {
          this.addCriteria = {};
          this.$bvModal.hide('add-modal');
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'error',
          title: 'ไม่สามารถเพิ่มเกณฑ์ได้',
          text: `ไม่สามารถเพิ่มเกณฑ์ ${this.addCriteria.name} ได้ \n ${err.response.DATA || err.message}`
        });
      });
    this.loading = false;
  }

  async onEdit() {
    // validate form
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;
    this.loading = true;

    this.selectCriteria['score'] = parseInt(`${this.selectCriteria['score']}`);

    await portfolioStore
      .createPortType(this.selectCriteria)
      .then(async () => {
        this.portType = await portfolioStore.getPortType();
        this.$swal({
          icon: 'success',
          title: 'แก้ไขเกณฑ์',
          text: `แก้ไขเกณฑ์ ${this.selectCriteria.name} เสร็จสิ้น`
        }).then(() => {
          this.selectCriteria = {};
          this.$bvModal.hide('edit-modal');
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'error',
          title: 'ไม่สามารถเพิ่มเกณฑ์ได้',
          text: `ไม่สามารถเพิ่มเกณฑ์ ${this.selectCriteria.name} ได้ \n ${err.response.DATA || err.message}`
        });
      });
    this.loading = false;
  }
}
</script>

<style scoped lang="scss">
.criteria-container {
  .table-condensed {
    font-size: 10px;
  }
}
</style>
