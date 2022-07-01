<template>
  <section
    class="is-flex is-align-items-center is-justify-content-space-between"
  >
    <TimePassed :timeSeconds="timeSeconds" />
    <ButtonClick
      @clicked="play"
      buttonIcon="fas fa-play"
      text="play"
      :buttonDisabled="cronometerIsCounting"
    />
    <ButtonClick
      @clicked="stop"
      buttonIcon="fas fa-stop"
      text="stop"
      :buttonDisabled="!cronometerIsCounting"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimePassed from "./TimePassed.vue";
import ButtonClick from "./ButtonClick.vue";

export default defineComponent({
  name: "TimerComponent",
  emits: ["TimerFinished"],
  components: {
    TimePassed,
    ButtonClick,
  },
  data() {
    return {
      timeSeconds: 0,
      cronometer: 0,
      cronometerIsCounting: false,
    };
  },
  methods: {
    play() {
      this.cronometerIsCounting = true;
      this.cronometer = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },
    stop() {
      this.cronometerIsCounting = false;
      clearInterval(this.cronometer);
      this.$emit("TimerFinished", this.timeSeconds);
      this.timeSeconds = 0;
    },
  },
});
</script>
