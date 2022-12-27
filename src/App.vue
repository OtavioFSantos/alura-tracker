<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkModeActivated }"
  >
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <Notification />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import Notification from "./components/Notifications.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    Notification,
  },
  data() {
    return {
      darkModeActivated: false,
    };
  },
  methods: {
    changeTheme(darkModeActivated: boolean) {
      this.darkModeActivated = darkModeActivated;
    },
  },
});
</script>

<style>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}
main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}
.taskList {
  padding: 1.25rem;
}
.content {
  background-color: var(--bg-primary);
}
</style>
