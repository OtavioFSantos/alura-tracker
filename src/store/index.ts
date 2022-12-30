import INotification from "@/interface/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFY } from "./type-mutations";
import { project, ProjectState } from "./modules/projects";
import { task, TaskState } from "./modules/tasks";

export interface State {
  task: TaskState;
  notifications: INotification[];
  project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    task: {
      tasks: [],
    },
    notifications: [],
    project: {
      projects: [],
    },
  },
  mutations: {
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
  modules: {
    project,
    task,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
