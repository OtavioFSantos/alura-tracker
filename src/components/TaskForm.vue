<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Form to create new task">
        <input type="text" class="input" placeholder="Add task" />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>{{ timePassed }}</strong>
          </section>
          <button class="button" @click="play">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
          </button>
          <button class="button" @click="stop">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskForm",
  data() {
    return {
      time: 0,
      cronometer: 0,
    };
  },
  computed: {
    timePassed(): string {
      return new Date(this.time * 1000).toISOString().substr(11, 8);
    },
  },
  methods: {
    play() {
      this.cronometer = setInterval(() => {
        this.time += 1;
      }, 1000);
    },
    stop() {
      clearInterval(this.cronometer);
    },
  },
});
</script>
