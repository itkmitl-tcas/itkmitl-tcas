<template>
  <div class="audit-container content bg-white mt-3 px-2 px-sm-3 px-md-4">
    <transition name="fade" mode="out-in">
      <AuditSelect v-if="mode == 'select'" @mode="updateMode" />
      <AuditProcess v-else @mode="updateMode" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuditSelect from '@components/teacher/AuditSelect.vue';
import AuditProcess from '@components/teacher/AuditProcess.vue';

@Component({
  components: {
    AuditSelect,
    AuditProcess
  }
})
export default class Audit extends Vue {
  mode = 'select';

  public updateMode(mode) {
    this.mode = mode;
  }
}
</script>
