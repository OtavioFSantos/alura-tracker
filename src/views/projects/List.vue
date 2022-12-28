<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fa fa-plus"></i>
      </span>
      <span>New Project</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fa fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="remove(project.id)">
              <span class="icon is-small">
                <i class="fa fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { GET_PROJECTS, ERASE_PROJECT } from "@/store/type-actions";
import useNotifier from "@/hooks/notifier";
import { TypeNotification } from "@/interface/INotification";

export default defineComponent({
  name: "List-component",
  methods: {
    remove(id: string) {
      this.store.dispatch(ERASE_PROJECT, id).then(() => {
        this.notify(
          TypeNotification.FAIL,
          "Project removed",
          "Project is not available anymore"
        );
      });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_PROJECTS);
    const { notify } = useNotifier();
    return {
      projects: computed(() => store.state.projects),
      store,
      notify,
    };
  },
});
</script>
