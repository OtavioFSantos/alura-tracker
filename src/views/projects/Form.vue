<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label">Project Name</label>
        <input
          type="text"
          class="input"
          id="projectName"
          v-model="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Save</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Forms",
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save() {
      this.store.commit("ADD_PROJECT", this.projectName);
      this.projectName = "";
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
