<template>
  <div class="teacher-content" style="margin-bottom: 1rem;">
    <transition name="fade" mode="out-in">
      <div v-if="loading" key="loading" class="loading w-100 text-center">
        <div key="loading" class="spinner-border text-primary mt-3" style="height: 24px; width: 24px" role="status" />
      </div>
      <div v-else-if="!studentProp" class="w-100 text-center">
        <div class="subtitle mt-3">
          ไม่พบข้อมูลที่ค้นหา
        </div>
      </div>
      <div v-else key="content" class="row m-0">
        <div class="col-12 text-left ml-3">
          <span>{{ student.prename }}{{ student.name }} {{ student.surname }} </span>
          <span class="font-weight-bold">{{ student.apply_id }}</span>
          <hr />
        </div>

        <!----------------------------- Common information --------------------------- -->
        <div class="col-12">
          <div v-b-toggle="'common-collapse'" class="font-weight-bold title bg-light rounded p-2 px-3">
            <b-icon-person class="text-primary" /> ข้อมูลผู้สมัคร <b-icon-chevron-down />
          </div>
          <b-collapse id="common-collapse" visible accordion="accordin">
            <form class="mt-3 px-3">
              <div class="form-group mt-4">
                <div class="row field-wrapper">
                  <div class="col-12">
                    <span class="d-inline-block p-2 px-3 bg-primary text-white  rounded">
                      <div v-if="student.step < 4" class="font-weight-bold">STEP: {{ student.step }}</div>
                      <div v-else class="font-weight-bold">COMPLETE</div>
                    </span>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">คำนำหน้า:</label>
                    <input v-model="student.prename" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">ชื่อจริง:</label>
                    <input v-model="student.name" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">นามสกุล:</label>
                    <input v-model="student.surname" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">เบอร์โทรติดต่อ:</label>
                    <input v-model="student.mobile" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">อีเมลล์:</label>
                    <input v-model="student.email" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">โรงเรียน:</label>
                    <input v-model="student.school_name" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">ประเภทการสมัคร:</label>
                    <input
                      v-model="student.apply_type"
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="ประเภทการสมัคร"
                      disabled
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">แผนการศึกษา:</label>
                    <b-form-select v-model="student.study_field" disabled size="sm" style="border-radius: 5px;" />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">GPAX รวม:</label>
                    <input v-model="student.gpax" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">GPAX วิชาคณิตศาสตร์:</label>
                    <input v-model="student.gpax_match" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">GPAX วิชาภาษาต่างประเทศ:</label>
                    <input v-model="student.gpax_eng" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="font-weight-bold">GPAX วิชาคอมพิวเตอร์:</label>
                    <input v-model="student.gpax_com" type="text" class="form-control form-control-sm" disabled />
                  </div>
                  <div class="col-12 m-0">
                    <hr class="m-0" />
                  </div>
                </div>
              </div>
            </form>
          </b-collapse>
        </div>
        <!---------------------------- Document information -------------------------- -->
        <div class="col-12 mt-3">
          <div v-b-toggle="'document-collapse'" class="title bg-light rounded p-2 px-3">
            <span v-if="student.document" class="font-weight-bold">
              <b-icon-file-earmark-medical class="text-primary"/> ข้อมูลเอกสาร <b-icon-chevron-down
            /></span>
            <span v-else class="font-weight-bold text-secondary">
              <b-icon-file-earmark-medical class="text-primary" /> ไม่มีข้อมูลเอกสาร</span
            >
          </div>
          <b-collapse v-if="student.document" id="document-collapse" accordion="accordin">
            <form class="mt-3 px-3">
              <div class="form-group mt-4">
                <div class="row field-wrapper">
                  <div class="col-12">
                    <label class="subtitle font-weight-bold">ใบ ปพ.1</label>
                    <small class="d-flex text-black-80 mb-3"
                      >ใบแสดงผลการเรียนเฉลี่ยสำสมในระดับชั้นมัธยมศึกษาตอนปลาย ๕ ภาคเรียนการศึกษา
                      (กรณีสำเร็จการศึกษาแล้วใช้ ๖ ภาคเรียนการศึกษา)</small
                    ><object
                      :data="student.document.transcript"
                      type="application/pdf"
                      class="rounded border-secondary"
                    >
                      <p><a :href="student.document.identity_card" target="_blank">ดูใบ ปพ.1</a></p>
                    </object>
                  </div>
                  <div class="col-12">
                    <label class="subtitle font-weight-bold">สำเนาบัตรประชาชน</label>
                    <small class="d-flex text-black-80 mb-3">สำเนาบัตประชาชน พร้อมลงนามสำเนาถูกต้อง</small>
                    <object
                      :data="student.document.identity_card"
                      type="application/pdf"
                      class="rounded border-secondary"
                    >
                      <p><a :href="student.document.identity_card" target="_blank">ดูสำเนาบัตรประชาชน</a></p>
                    </object>
                  </div>
                  <div class="col-12">
                    <label class="subtitle font-weight-bold">สำเนาบัตรประจำตัวนักเรียน</label>
                    <small class="d-flex text-black-80 mb-3">สำเนาบัตรประจำตัวนักเรียน พร้อมลงนามสำเนาถูกต้อง</small>
                    <object
                      :data="student.document.student_card"
                      type="application/pdf"
                      class="rounded border-secondary"
                    >
                      <p><a :href="student.document.student_card" target="_blank">สำเนาบัตรประจำตัวนักเรียน</a></p>
                    </object>
                  </div>
                  <div v-if="student.document.full_portfolio" class="col-12">
                    <label class="subtitle font-weight-bold">แฟ้มสะสมผลงาน</label>
                    <small class="d-flex text-black-80 mb-3">ไฟล์แฟ้มสะสมผลงานแบบเต็มจำนวนไม่เกิน 10 หน้า PDF</small>
                    <object
                      :data="student.document.full_portfolio"
                      type="application/pdf"
                      class="rounded border-secondary"
                    >
                      <p><a :href="student.document.full_portfolio" target="_blank">ดูแฟ้มสะสมผลงาน</a></p>
                    </object>
                  </div>
                  <div v-if="student.document.name_change" class="col-12">
                    <label class="subtitle font-weight-bold">สำเนาใบเปลี่ยนชื่อ</label>
                    <small class="d-flex text-black-80 mb-3">สำเนาบัตรเปลี่ยนชื่อ (ถ้ามี) พร้อมลงนามสำเนาถูกต้อง</small>
                    <object
                      :data="student.document.name_change"
                      type="application/pdf"
                      class="rounded border-secondary"
                    >
                      <p><a :href="student.document.name_change" target="_blank">ดูสำเนาใบเปลี่ยนชื่อ</a></p>
                    </object>
                  </div>
                  <div class="col-12 m-0">
                    <hr class="m-0" />
                  </div>
                </div>
              </div>
            </form>
          </b-collapse>
        </div>

        <!---------------------------- Portfolio information -------------------------->
        <div class="col-12 mt-3 mb-3">
          <div v-b-toggle="'portfolio-collapse'" class="title bg-light rounded p-2 px-3">
            <span v-if="student.portfolios.length" class="font-weight-bold"
              ><b-icon-journal-album class="text-primary"/> ข้อมูลผลงาน <b-icon-chevron-down
            /></span>
            <span v-else class="font-weight-bold text-secondary"
              ><b-icon-journal-album class="text-primary" /> ไม่มีข้อมูลผลงาน</span
            >
          </div>
          <b-collapse v-if="student.portfolios.length" id="portfolio-collapse" accordion="accordin">
            <form class="mt-3 px-3">
              <div class="form-group mt-4">
                <div class="row field-wrapper">
                  <div class="col-12">
                    <label v-b-toggle="'portfolio-highlight-collapse'" class="subtitle font-weight-bold text-primary"
                      >ส่วนที่ 1: ผลงานดีเด่น <b-icon-chevron-down
                    /></label>
                    <b-collapse id="portfolio-highlight-collapse" accordion="portfolio-accordin" visible>
                      <div class="row bg-light rounded">
                        <div class="col-12 mb-3 mt-4">
                          <object
                            :data="student.portfolios[0].file"
                            type="application/pdf"
                            class="rounded border-secondary"
                          >
                            <p><a :href="student.portfolios[0].file" target="_blank">ดูผลงานดีเด่น</a></p>
                          </object>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> ชื่อผลงาน:</label>
                          <div>{{ student.portfolios[0].name }}</div>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> รายละเอียดผลงาน:</label>
                          <div>{{ student.portfolios[0].desc }}</div>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> ประเภท:</label>
                          <div>
                            {{ student.portfolios[0].portfolio_type.desc }}
                            <span class="bg-primary text-white p-1 px-2 rounded d-inline-block mt-1"
                              >{{ student.portfolios[0].portfolio_type.score }} คะแนน</span
                            >
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </div>
                  <div class="col-12">
                    <label v-b-toggle="'portfolio-other-collapse'" class="subtitle font-weight-bold text-primary"
                      >ส่วนที่ 2: ผลงานอื่นๆ <b-icon-chevron-down
                    /></label>
                    <b-collapse id="portfolio-other-collapse" accordion="portfolio-accordin" visible>
                      <div
                        v-for="(item, key) in student.portfolios.slice(1, 100)"
                        :key="`portfolio-${key}`"
                        class="row bg-light rounded"
                      >
                        <div class="col-12 mb-3 mt-4">
                          <object :data="item.file" type="application/pdf" class="rounded border-secondary">
                            <p><a :href="item.file" target="_blank">ดูผลงานดีเด่น</a></p>
                          </object>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> ชื่อผลงาน:</label>
                          <div>{{ item.name }}</div>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> รายละเอียดผลงาน:</label>
                          <div>{{ item.desc }}</div>
                        </div>
                        <div class="col-12 mb-3">
                          <label class="subtitle text-black-80 font-weight-bold mb-0"> ประเภท:</label>
                          <div>
                            {{ item.portfolio_type.desc }}
                            <span class="bg-primary text-white p-1 px-2 rounded d-inline-block mt-1"
                              >{{ item.portfolio_type.score }} คะแนน</span
                            >
                          </div>
                        </div>
                        <div class="col-12 m-0">
                          <hr class="m-0" />
                        </div>
                      </div>
                    </b-collapse>
                  </div>
                </div>
              </div>
            </form>
          </b-collapse>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IUser, User } from '@/type/index';
import { userStore } from '@/store';
@Component({
  name: 'TeacherContent'
})
export default class TContent extends Vue {
  loading = false;
  document;
  portfolio;
  @Prop(Object) readonly studentProp!: User;
  student: User = new User();

  @Watch('studentProp')
  async onChange(data) {
    if (!this.studentProp || !this.studentProp.apply_id) return;
    this.loading = true;
    await userStore
      .getUserById(this.studentProp.apply_id)
      .then((resp) => (this.student = resp))
      .catch((err) => this.$swal('ไม่สามารถดึงข้อมูลผู้สมัครได้', undefined, 'warning'))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }

  async created() {
    if (!this.studentProp || !this.studentProp.apply_id) return;
    await userStore
      .getUserById(this.studentProp.apply_id)
      .then((resp) => (this.student = resp))
      .catch((err) => this.$swal('ไม่สามารถดึงข้อมูลผู้สมัครได้', undefined, 'warning'))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }
}
</script>

<style lang="scss" scoped>
object {
  min-height: 50vh;
  width: 100%;
}
.teacher-content {
  min-height: calc(97vh - 200px - 1rem);
  max-height: calc(97vh - 200px - 1rem);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
