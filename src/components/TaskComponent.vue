<template>
  <BoxComponent>
    <div class="columns task" @click="clickTask">
      <div class="column is-4">{{ task.description || "Generic Task" }}</div>
      <div class="column is-5">{{ task.project?.name || "N/D" }}</div>
      <div class="column">
        <TimePassed :timeSeconds="task.timeSeconds" />
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TimePassed from "./TimePassed.vue";
import ITask from "../interface/ITask";
import BoxComponent from "./BoxComponent.vue";

export default defineComponent({
  name: "TaskComponent",
  emits: ["onClickTask"],
  components: {
    TimePassed,
    BoxComponent,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    clickTask() {
      this.$emit("onClickTask", this.task);
    },
  },
});
</script>

<style scoped>
.task:hover {
  cursor: pointer;
}
</style>
