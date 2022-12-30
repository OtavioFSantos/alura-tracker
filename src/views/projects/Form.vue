<template>
  <section>
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
import useNotifier from "@/hooks/notifier";
import { TypeNotification } from "@/interface/INotification";
import { useStore } from "@/store";
import { MODIFY_PROJECT, REGISTER_PROJECT } from "@/store/type-actions";

export default defineComponent({
  name: "Forms-component",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.project.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save() {
      if (this.id) {
        this.store
          .dispatch(MODIFY_PROJECT, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => {
            this.notify(
              TypeNotification.WARNING,
              "Project modified",
              "Project is now modified"
            );
            this.$router.push("/projects");
          });
      } else {
        this.store.dispatch(REGISTER_PROJECT, this.projectName).then(() => {
          this.notify(
            TypeNotification.SUCCESS,
            "Project created",
            "Project is now available"
          );
          this.projectName = "";
          this.$router.push("/projects");
        });
      }
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>
