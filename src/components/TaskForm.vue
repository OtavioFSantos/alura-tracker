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
          <select v-model="idProject">
            <option value="">Select Project</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
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
import { defineComponent, computed } from "vue";
import TimerComponent from "./TimerComponent.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "TaskForm",
  emits: ["onSaveTask"],
  components: {
    TimerComponent,
  },
  data() {
    return {
      description: "",
      idProject: "",
    };
  },
  methods: {
    taskFinished(TimePassed: number): void {
      this.$emit("onSaveTask", {
        timeSeconds: TimePassed,
        description: this.description,
        project: this.projects.find((proj) => proj.id == this.idProject),
      });
      this.description = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projects: computed(() => store.state.project.projects),
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
