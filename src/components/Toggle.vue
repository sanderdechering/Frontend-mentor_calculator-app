<template>
  <div
    class="relative h-6 w-full cursor-pointer rounded-full px-1 pt-1.5"
    :class="props.toggle.backgroundColor"
    @click="changeTheme"
  >
    <div
      class="absolute h-3 w-3 rounded-full bg-red-400 duration-300 ease-in-out"
      :class="translateX[bulletX.value]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const emit = defineEmits(["emitTheme"]);
const props = defineProps<{
  toggle: {
    bulletColor: string;
    backgroundColor: string;
  };
}>();
const translateX = ["translate-x-0", "translate-x-5", "translate-x-10"];
let theme = 1;
let bulletX = reactive({
  value: 0,
});

function changeTheme() {
  if (bulletX.value === 2 && theme === 3) {
    theme = 1;
    bulletX.value = 0;
    emit("emitTheme", theme);
    return;
  }
  theme += 1;
  bulletX.value += 1;
  emit("emitTheme", theme);
}
</script>

<style scoped></style>
