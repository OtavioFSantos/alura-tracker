<template>
  <main class="columns is-gapless is-multiline dark-mode">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter content">
      <TaskForm @onSaveTask="saveTask" />
      <div class="taskList">
        <TaskComponent
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
        />
        <BoxComponent v-if="emptyList"> No tasks yet! </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskComponent from "./components/TaskComponent.vue";
import ITask from "./interface/ITask";
import BoxComponent from "./components/BoxComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    TaskForm,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task);
    },
  },
});
</script>

<style>
.taskList {
  padding: 1.25rem;
}
main {
  --bg-primary: #fff;
  --text-primary: #000;
}
main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}
.content {
  background-color: var(--bg-primary);
}
</style>
