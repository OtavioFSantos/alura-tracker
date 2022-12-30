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
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
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
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotifier();
    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const save = () => {
      if (props.id) {
        store
          .dispatch(MODIFY_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => {
            notify(
              TypeNotification.WARNING,
              "Project modified",
              "Project is now modified"
            );
            router.push("/projects");
          });
      } else {
        store.dispatch(REGISTER_PROJECT, projectName.value).then(() => {
          projectName.value = "";
          notify(
            TypeNotification.SUCCESS,
            "Project created",
            "Project is now available"
          );
          router.push("/projects");
        });
      }
    };

    return {
      projectName,
      save,
    };
  },
});
</script>
