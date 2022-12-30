import INotification from "@/interface/INotification";
import { InjectionKey } from "vue";
import http from "@/http";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFY, DEFINE_TASKS, ADD_TASK, EDIT_TASK } from "./type-mutations";
import { GET_TASKS, MODIFY_TASK, REGISTER_TASK } from "./type-actions";
import ITask from "@/interface/ITask";
import { project, ProjectState } from "./modules/projects";

export interface State {
  tasks: ITask[];
  notifications: INotification[];
  project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    notifications: [],
    project: {
      projects: [],
    },
  },
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
    [NOTIFY](state, newNotification: INotification) {
      newNotification.id = new Date().getTime();
      state.notifications.push(newNotification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notification) => notification.id != newNotification.id
        );
      }, 3000);
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
  modules: {
    project,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
