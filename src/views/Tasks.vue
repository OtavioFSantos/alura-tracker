<template>
    <TaskForm @onSaveTask="saveTask" />
    <div class="taskList">
        <BoxComponent v-if="emptyList"> No tasks yet! </BoxComponent>
        <TaskComponent
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskComponent from "../components/TaskComponent.vue";
import ITask from "../interface/ITask";
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
      tasks: [] as ITask[]
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
    }
  },
});
</script>
