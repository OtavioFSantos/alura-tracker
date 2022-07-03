<template>
  <BoxComponent>
    <div class="columns">
      <div class="column is-7">{{ task.description || "Generic Task" }}</div>
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
});
</script>
