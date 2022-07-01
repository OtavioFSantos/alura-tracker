<template>
  <button class="button" @click="clicked" :disabled="buttonDisabled">
    <span class="icon">
      <i :class="buttonIcon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonClick",
  emits: ["clicked"],
  props: {
    buttonDisabled: {
      type: Boolean,
    },
    buttonIcon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicked(): void {
      this.$emit("clicked");
    },
  },
});
</script>
