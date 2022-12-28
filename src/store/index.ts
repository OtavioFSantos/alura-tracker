import INotification from "@/interface/INotification";
import IProject from "@/interface/IProject";
import { InjectionKey } from "vue";
import http from "@/http";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  EDIT_PROJECT,
  NOTIFY,
  DEFINE_PROJECTS,
} from "./type-mutations";
import {
  ERASE_PROJECT,
  GET_PROJECTS,
  MODIFY_PROJECT,
  REGISTER_PROJECT,
} from "./type-actions";

interface State {
  projects: IProject[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id === project.id);
      state.projects[index] = project;
    },
    [REMOVE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((proj) => proj.id != id);
    },
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
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
    [GET_PROJECTS]({ commit }) {
      http
        .get("projects")
        .then((answer) => commit(DEFINE_PROJECTS, answer.data));
    },
    [REGISTER_PROJECT](context, projectName: string) {
      return http.post("/projects", { name: projectName });
    },
    [MODIFY_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [ERASE_PROJECT]({ commit }, id: string) {
      return http.delete(`/projects/${id}`).then(() => {
        this.commit(REMOVE_PROJECT, id);
      });
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
