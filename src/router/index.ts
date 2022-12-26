import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from "../views/Tasks.vue";
import Projects from "../views/Projects.vue";
import Form from "../views/projects/Form.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/projects/new",
    name: "New project",
    component: Form,
  },
  {
    path: "/projects/:id",
    name: "Edit project",
    component: Form,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
