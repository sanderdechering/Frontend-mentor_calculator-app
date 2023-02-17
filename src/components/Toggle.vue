<template>
  <div
    class="relative h-6 w-full cursor-pointer rounded-full bg-My-very-dark-violet-3 px-1 pt-1.5 group-hover:after:translate-x-1"
    @click="changeTheme"
  >
    <div
      class="absolute h-3 w-3 rounded-full bg-My-soft-cyan duration-300 ease-in-out"
      :class="'translate-x-' + bulletX.value"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  toggle: object;
}>();

let theme = 2;
let bulletX = reactive({
  value: 10,
});

function changeTheme() {
  if (bulletX.value === 10 && theme === 2) {
    theme = 0;
    bulletX.value = 0;
    return;
  }
  theme += 1;
  bulletX.value += 5;
}
</script>

<style scoped></style>
