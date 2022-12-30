<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Form to create new task">
        <input
          type="text"
          class="input"
          placeholder="Add task"
          v-model="description"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Select Project</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TimerComponent @TimerFinished="taskFinished" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import TimerComponent from "./TimerComponent.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "TaskForm",
  emits: ["onSaveTask"],
  components: {
    TimerComponent,
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const description = ref("");
    const projectId = ref("");
    const projects = computed(() => store.state.project.projects);

    const taskFinished = (TimePassed: number): void => {
      emit("onSaveTask", {
        timeSeconds: TimePassed,
        description: description.value,
        project: projects.value.find((proj) => proj.id == projectId.value),
      });
      description.value = "";
    };

    return {
      projects,
      projectId,
      description,
      taskFinished,
    };
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
