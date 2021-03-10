import Vue from 'vue';
import env from '@/environment';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { createMappingPayload } from '../../utils/helper';
import { AxiosError, AxiosResponse } from 'axios';
import { IAudit } from '@/type/audit';

@Module({
  name: 'audit',
  namespaced: true,
  stateFactory: true
})
export default class AuditStore extends VuexModule {
  // @Mutation

  /* --------------------------------- Actions -------------------------------- */
  @Action({ rawError: true })
  async mapping(data) {
    return new Promise((resolve, reject) => {
      const payload = createMappingPayload(data);
      Vue.prototype.$axios
        .post(`${env.BACK_URI}/audit/mapping`, payload)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  @Action({ rawError: true })
  async auditGrade(data) {
    return new Promise((resolve, reject) => {
      const payload = { student_id: data.apply_id, apply_type: data.apply_type };
      Vue.prototype.$axios
        .post(`${env.BACK_URI}/audit/grade`, payload)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  @Action({ rawError: true })
  async submitAudit(data) {
    return new Promise((resolve, reject) => {
      const payload = {
        student_id: data.student_id,
        score: data.score
      };
      Vue.prototype.$axios
        .post(`${env.BACK_URI}/audit/submit`, payload)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  @Action({ rawError: true })
  async getMapping(teacher_id) {
    const payload = { params: { teacher_id: teacher_id } };
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios
        .get(`${env.BACK_URI}/audit/${teacher_id}`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  @Action({ rawError: true })
  async delMapping(student_id) {
    const payload = { params: { student_id: student_id } };
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios
        .delete(`${env.BACK_URI}/audit/${student_id}`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }

  @Action({ rawError: true })
  async exportAudit() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios
        .get(`${env.BACK_URI}/audit/export`)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  }
}
