<template>
  <div class="notifications">
    <article
      class="message"
      :class="context[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { TypeNotification } from "@/interface/INotification";

export default defineComponent({
  name: "Notification-component",
  data() {
    return {
      context: {
        [TypeNotification.SUCCESS]: "is-success",
        [TypeNotification.WARNING]: "is-warning",
        [TypeNotification.FAIL]: "is-danger",
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 1;
}
</style>
