import http from "@/http";
import ITask from "@/interface/ITask";
import { State } from "@/store";
import { GET_TASKS, REGISTER_TASK, MODIFY_TASK } from "@/store/type-actions";
import { ADD_TASK, DEFINE_TASKS, EDIT_TASK } from "@/store/type-mutations";
import { Module } from "vuex";

export interface TaskState {
  tasks: ITask[];
}

export const task: Module<TaskState, State> = {
  mutations: {
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t) => t.id === task.id);
      state.tasks[index] = task;
    },
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
  },
  actions: {
    [GET_TASKS]({ commit }) {
      http.get("tasks").then((response) => commit(DEFINE_TASKS, response.data));
    },
    [REGISTER_TASK]({ commit }, task: ITask) {
      return http
        .post("/tasks", task)
        .then((response) => commit(ADD_TASK, response.data));
    },
    [MODIFY_TASK]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then(() => commit(EDIT_TASK, task));
    },
  },
};
