<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 3: ข้อมูลผลงาน
    </span>
    <hr />
    <ValidationObserver ref="form">
      <form class="mt-3" enctype="multipart/form-data" @submit.prevent="onSave">
        <div class="form-group mt-4">
          <div class="row field-wrapper">
            <div class="col font-weight-bold text-primary">
              <span v-b-toggle.head-1 class="font-weight-bold">
                ส่วนที่ 1: ผลงานดีเด่น
              </span>
            </div>
          </div>
          <b-collapse id="head-1" :visible="!form[0].file ? true : false" class="mt-2">
            <div class="row field-wrapper">
              <div class="col-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">ชื่อผลงาน:</label>
                  <input v-model="form[0].name" type="text" class="form-control" placeholder="ชื่อผลงานดีเด่น" />
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12 ">
                <ValidationProvider v-slot="{ errors, validate }" rules="required">
                  <label class="subtitle font-weight-bold">หมวดหมู่ผลงาน:</label>
                  <b-form-select v-model="form[0].type_id" class="mb-3" @change="validate($event)">
                    <b-form-select-option :value="null" selecte>
                      เลือกหมวดหมู่ผลงาน
                    </b-form-select-option>
                    <b-form-select-option-group
                      v-for="(group, key) in dataPortType"
                      :key="key"
                      class="font-weight-bold"
                      :label="key"
                    >
                      <b-form-select-option v-for="option in group" :key="option.name" :value="option.type_id">
                        {{ option.desc }}
                      </b-form-select-option>
                    </b-form-select-option-group>
                  </b-form-select>
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <label class="subtitle font-weight-bold">ชื่อผลงาน:</label>
                  <textarea v-model="form[0].desc" class="form-control" rows="3"></textarea>
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <div class="col-12">
                <ValidationProvider v-slot="{ validate, errors }" :rules="{ required: form[0].file ? false : true }">
                  <label class="subtitle font-weight-bold d-block">ไฟล์ผลงานดีเด่น</label>
                  <b-form-file
                    size="sm"
                    name="portfolio_0"
                    :placeholder="form[0].file ? 'UPDATE STUDENT CARD' : 'CHOOSE STUDENT CARD(.PDF)'"
                    :class="{ active: form[0].file }"
                    accept=".pdf, .PDF"
                    drop-placeholder="Drop file here..."
                    @change="
                      fileChange($event.target.name, $event.target.files, 'portfolio_0');
                      validate($event);
                    "
                  ></b-form-file>
                  <small v-if="form[0].file" class="form-text">
                    <a :href="form[0].file" target="_blanks">ดูสำเนาบัตรประจำตัวนักเรียน</a>
                  </small>
                  <small class="form-text text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </div>
          </b-collapse>
          <div class="row field-wrapper">
            <div class="col font-weight-bold text-primary d-flex flex-row justify-content-between">
              <div v-b-toggle="'head-2'" class="font-weight-bold">
                ส่วนที่ 2: ผลงานอื่นๆ
              </div>
              <button class="btn btn-primary btn-sm" type="button" @click="add()">
                เพิ่มรายการ
              </button>
            </div>
            <hr />
          </div>
          <b-collapse :id="`head-2`" visible class="mt-2">
            <div v-for="(item, key) in form.slice(1, 5)" :key="key" class="row field-wrapper">
              <div class="col-12 mb-2">
                <div v-b-toggle="`collapse-${key + 1}`" class="font-weight-bold h5">รายการที่ {{ key + 1 }}</div>
                <hr />
              </div>
              <b-collapse :id="`collapse-${key + 1}`" visible class="mt-2">
                <div class="col-12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <label class="subtitle font-weight-bold">ชื่อผลงาน:</label>
                    <input
                      v-model="form[key + 1].name"
                      type="text"
                      class="form-control"
                      placeholder="ชื่อผลงานดีเด่น"
                    />
                    <small class="form-text text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="col-12 ">
                  <ValidationProvider v-slot="{ errors, validate }" rules="required">
                    <label class="subtitle font-weight-bold">หมวดหมู่ผลงาน:</label>
                    <b-form-select v-model="form[key + 1].type_id" class="mb-3" @change="validate($event)">
                      <b-form-select-option :value="null" selecte>
                        เลือกหมวดหมู่ผลงาน
                      </b-form-select-option>
                      <b-form-select-option-group
                        v-for="(group, typeKey) in dataPortType"
                        :key="typeKey"
                        class="font-weight-bold"
                        :label="typeKey"
                      >
                        <b-form-select-option v-for="option in group" :key="option.name" :value="option.type_id">
                          {{ option.desc }}
                        </b-form-select-option>
                      </b-form-select-option-group>
                    </b-form-select>
                    <small class="form-text text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="col-12">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <label class="subtitle font-weight-bold">ชื่อผลงาน:</label>
                    <textarea v-model="form[key + 1].desc" class="form-control" rows="3"></textarea>
                    <small class="form-text text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="col-12">
                  <ValidationProvider
                    v-slot="{ validate, errors }"
                    :rules="{ required: form[key + 1].file ? false : true }"
                  >
                    <label class="subtitle font-weight-bold d-block">ไฟล์ผลงานดีเด่น</label>
                    <b-form-file
                      size="sm"
                      :name="`portfolio_${key + 1}`"
                      :placeholder="form[key + 1].file ? 'UPDATE STUDENT CARD' : 'CHOOSE STUDENT CARD(.PDF)'"
                      :class="{ active: form[key + 1].file }"
                      accept=".pdf, .PDF"
                      drop-placeholder="Drop file here..."
                      @change="
                        fileChange($event.target.name, $event.target.files, `portfolio_${key + 1}`);
                        validate($event);
                      "
                    ></b-form-file>
                    <small v-if="form[key + 1].file" class="form-text">
                      <a :href="form[key + 1].file" target="_blanks">ดูสำเนาบัตรประจำตัวนักเรียน</a>
                    </small>
                    <small class="form-text text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </b-collapse>
            </div>
          </b-collapse>
          <div class="row field-wrapper">
            <div class="col-12 text-center">
              <router-link :to="{ name: 'Step2' }" class="btn border border-primary text-primary mt-4 px-5 mr-3">
                ย้อนกลับ
              </router-link>
              <button type="submit" class="btn btn-primary mt-4 px-5">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import SDashboard from '../Dashboard.vue';
import env from '@/environment';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { Component, Watch } from 'vue-property-decorator';
import { PortfolioType, Portfolio } from '@/type/portfolio';
import Store, { portfolioStore } from '@/store';

extend('required', {
  ...required,
  message: 'ค่าต้องไม่ว่างเปล่า'
});

@Component({
  name: 'Step3'
})
export default class Step2 extends SDashboard {
  loading = false;
  form: any = new Portfolio().portfolio;
  collapseStates = [this.form[0].file == '' ? true : false];

  get dataPortType() {
    return portfolioStore.dataPortType;
  }

  get dataPort() {
    return portfolioStore.dataPort;
  }

  upload(payload) {
    return new Promise((resolve, reject) => {
      portfolioStore
        .createPort(payload)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err.message));
    });
  }

  async onSave() {
    const validate = await (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!validate) return;

    const promises: any = [];
    for (const payload of this.form) {
      promises.push(this.upload(payload));
    }

    await Promise.all(promises)
      .then(() => {
        this.$swal({
          icon: 'success',
          title: 'บันทึก',
          text: 'ทำการบันทึกข้อมูลผลงาน'
        }).then(() => {
          // this.$router.push({ name: 'Step4' });
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'warning',
          title: 'บันทึก',
          text: 'ไม่สามารถบันทึกข้อมูลผลงานได้ กรุณาลองใหม่อีกครั้ง'
        });
      });
  }

  // on file change
  fileChange(name, file, field) {
    this.form[0][field] = file[0];
  }

  // add form list
  add() {
    this.form.push(new Portfolio().portfolio[0]);
  }

  async mounted() {
    await portfolioStore
      .getPort()
      .then(() => {
        this.form = this.dataPort;
      })
      .catch((err) => err);
    if (!this.form[1]) this.form.push(new Portfolio().portfolio[0]);
  }
}
</script>

<style lang="scss"></style>
