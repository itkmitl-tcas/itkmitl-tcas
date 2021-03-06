<template>
  <div class="">
    <div v-b-toggle="'audit-port-collapse'">
      <div class="row">
        <div class="col font-weight-bold">
          <b-icon-journal-album class="text-primary" /> ประเมินผลงาน <b-icon-chevron-down />
          <hr />
        </div>
      </div>
    </div>
    <b-collapse id="audit-port-collapse" v-model="visible" visible>
      <div class="row">
        <div v-if="student.document" class="col-12 col-md-12">
          <label v-b-toggle="'portfolio-full-collapse'" class="subtitle font-weight-bold text-primary"
            >- แฟ้มสะสมผลงาน <b-icon-chevron-down
          /></label>
          <b-collapse id="portfolio-full-collapse" accordion="portfolio-accordin" visible>
            <div class="row rounded">
              <div class="col-12 col-md-6 mb-3 mt-4">
                <object :data="student.document.full_portfolio" type="application/pdf" class="rounded border-secondary">
                  <p><a :href="student.document.full_portfolio" target="_blank">คลิ๊กเพื่อเปิดไฟล์</a></p>
                </object>
              </div>
            </div>
          </b-collapse>
        </div>
        <div v-else class="col-12">
          <label class="subtitle text-secondary">- ไม่พบแฟ้มสะสมผลงาน</label>
        </div>
        <div v-if="student.portfolios[0]" class="col-12 col-md-12">
          <label v-b-toggle="'portfolio-highlight-collapse'" class="subtitle font-weight-bold text-primary"
            >- ผลงานดีเด่น <b-icon-chevron-down
          /></label>
          <b-collapse id="portfolio-highlight-collapse" accordion="portfolio-accordin">
            <div class="row rounded">
              <div class="col-12 col-md-6 mb-3 mt-4">
                <object :data="student.portfolios[0].file" type="application/pdf" class="rounded border-secondary">
                  <p><a :href="student.portfolios[0].file" target="_blank">คลิ๊กเพื่อเปิดไฟล์</a></p>
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
        <div v-else class="col-12">
          <label class="subtitle text-secondary">- ไม่พบผลงานดีเด่น</label>
        </div>
        <div v-if="student.portfolios[1]" class="col-12 col-md-12">
          <label v-b-toggle="'portfolio-other-collapse'" class="subtitle font-weight-bold text-primary"
            >- ผลงานอื่นๆ <b-icon-chevron-down
          /></label>
          <b-collapse id="portfolio-other-collapse" accordion="portfolio-accordin">
            <div class="row rounded">
              <div
                v-for="(item, key) in student.portfolios.slice(1, 100)"
                :key="`portfolio-${key}`"
                class="col-12 col-md-6 mb-3 mt-4"
              >
                <object :data="item.file" type="application/pdf" class="rounded border-secondary">
                  <p><a :href="item.file" target="_blank">คลิ๊กเพื่อเปิดไฟล์</a></p>
                </object>
                <label class="subtitle text-black-80 font-weight-bold mb-0"> ชื่อผลงาน:</label>
                <div>{{ item.name }}</div>
                <label class="subtitle text-black-80 font-weight-bold mb-0"> รายละเอียดผลงาน:</label>
                <div>{{ item.desc }}</div>
                <div>
                  {{ item.portfolio_type.desc }}
                  <span class="bg-primary text-white p-1 px-2 rounded d-inline-block mt-1"
                    >{{ item.portfolio_type.score }} คะแนน</span
                  >
                </div>
                <hr />
              </div>
            </div>
          </b-collapse>
        </div>
        <div v-else class="col-12">
          <label class="subtitle text-secondary">- ไม่พบผลงานอื่นๆ</label>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '@/type/index';
import { userStore, auditStore } from '@/store';
@Component
export default class AuditStep2 extends Vue {
  @Prop() studentData!: User;
  student: User = new User();
  visible = true;

  @Watch('studentData')
  onStudentDataChange(data) {
    userStore
      .getUserById(data.apply_id)
      .then((resp: any) => {
        this.student = resp;
        this.$emit('port-score', resp?.portfolios[0]?.portfolio_type?.score || 0);
      })
      .catch((err) => this.$swal('ไม่สามารถดึงข้อมูลผู้สมัครได้', err.message, 'warning'));
    this.visible = true;
  }
}
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap';
object {
  min-height: 70vh;
  width: 100%;
}
</style>
