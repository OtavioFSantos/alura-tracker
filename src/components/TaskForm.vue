<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Add task"
          v-model="description"
        />
      </div>
      <div class="column">
        <TimerComponent @TimerFinished="taskFinished" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerComponent from "./TimerComponent.vue";

export default defineComponent({
  name: "TaskForm",
  emits: ["onSaveTask"],
  components: {
    TimerComponent,
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    taskFinished(TimePassed: number): void {
      this.$emit("onSaveTask", {
        timeSeconds: TimePassed,
        description: this.description,
      });
    },
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
