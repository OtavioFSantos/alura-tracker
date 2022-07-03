<template>
  <section>
    <strong class="display">{{ time }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimePassed",
  props: {
    timeSeconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    time(): string {
      return new Date(this.timeSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style>
.display {
  color: var(--text-primary);
}
</style>
