<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <div>
      <button class="button" @click="changeTheme">{{ textButton }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tasks
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram"></i>
            Projects
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeTheme"],
  data() {
    return {
      darkModeActivated: false,
    };
  },
  computed: {
    textButton() {
      if (this.darkModeActivated) {
        return "Disable Dark Mode";
      }
      return "Able Dark Mode";
    },
  },
  methods: {
    changeTheme() {
      this.darkModeActivated = !this.darkModeActivated;
      this.$emit("onChangeTheme", this.darkModeActivated);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
