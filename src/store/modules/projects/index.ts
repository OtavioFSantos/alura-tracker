import http from "@/http";
import IProject from "@/interface/IProject";
import { State } from "@/store";
import {
  GET_PROJECTS,
  REGISTER_PROJECT,
  MODIFY_PROJECT,
  ERASE_PROJECT,
} from "@/store/type-actions";
import {
  ADD_PROJECT,
  EDIT_PROJECT,
  REMOVE_PROJECT,
  DEFINE_PROJECTS,
} from "@/store/type-mutations";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
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
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http
        .get("projects")
        .then((response) => commit(DEFINE_PROJECTS, response.data));
    },
    [REGISTER_PROJECT](context, projectName: string) {
      return http.post("/projects", { name: projectName });
    },
    [MODIFY_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [ERASE_PROJECT]({ commit }, id: string) {
      return http.delete(`/projects/${id}`).then(() => {
        commit(REMOVE_PROJECT, id);
      });
    },
  },
};
