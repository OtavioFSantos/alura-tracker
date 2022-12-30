<template>
  <TaskForm @onSaveTask="saveTask" />
  <div class="taskList">
    <BoxComponent v-if="emptyList">No tasks!</BoxComponent>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Filter tasks"
          v-model="filterTasks"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TaskComponent
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @onClickTask="selectTask"
    />
    <div
      class="modal"
      :class="{ 'is-active': selectedTask }"
      v-if="selectedTask"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit task</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="taskDescription" class="label">Description</label>
            <input
              id="taskDescription"
              class="input"
              v-model="selectedTask.description"
              type="text"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="changeTask">
            Save changes
          </button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskComponent from "../components/TaskComponent.vue";
import {
  GET_TASKS,
  REGISTER_TASK,
  GET_PROJECTS,
  MODIFY_TASK,
} from "@/store/type-actions";
import { useStore } from "@/store";
import ITask from "@/interface/ITask";
import BoxComponent from "../components/BoxComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    TaskForm,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      selectedTask: null as ITask | null,
    };
  },
  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(REGISTER_TASK, task);
    },
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
    changeTask() {
      this.store.dispatch(MODIFY_TASK, this.selectedTask);
      this.closeModal();
    },
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    const filterTasks = ref("");

    const tasks = computed(() =>
      store.state.task.tasks.filter(
        (t) => !filterTasks.value || t.description.includes(filterTasks.value)
      )
    );

    return {
      tasks,
      store,
      filterTasks,
    };
  },
});
</script>
