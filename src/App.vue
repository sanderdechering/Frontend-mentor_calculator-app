<template>
  <div class="min-h-screen w-full bg-My-very-dark-violet-1">
    <div class="mx-auto w-[350px] flex-col pt-24 text-My-light-yellow">
      <!--   Header     -->
      <div class="flex justify-between">
        <h1 class="text-2xl">calc</h1>
        <div class="flex w-1/3 flex-row text-sm">
          <div class="flex h-full w-2/4 items-end">
            <h2 class="inline-block align-top">THEME</h2>
          </div>
          <div class="flex w-2/4 flex-col">
            <ul class="flex justify-between">
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <Toggle
              :toggle="toggle"
              @emitBoolean="(value) => (this.toggle.value = value)"
            />
          </div>
        </div>
      </div>

      <!--   Total number     -->
      <div
        class="mt-8 rounded-xl bg-My-very-dark-violet-2 py-7 px-5 text-right text-4xl"
      >
        <span v-for="number in total.value" v-if="total.value.length !== 0">
          {{ number }}
        </span>
        <span v-else>0</span>
      </div>

      <!--   Buttons   -->
      <div class="mt-4 grid grid-cols-4 gap-4 bg-My-very-dark-violet-2 p-5">
        <div class="basic-button" @click="pushNumber(7)">7</div>
        <div class="basic-button" @click="pushNumber(8)">8</div>
        <div class="basic-button" @click="pushNumber(9)">9</div>
        <div
          class="cursor-pointer select-none rounded-md border-b-4 border-My-vivid-magenta bg-My-dark-violet pb-3.5 pt-5 text-center text-xl text-My-white hover:bg-fuchsia-500/50"
          @click="del"
        >
          DEL
        </div>
        <div class="basic-button" @click="pushNumber(4)">4</div>
        <div class="basic-button" @click="pushNumber(5)">5</div>
        <div class="basic-button" @click="pushNumber(6)">6</div>
        <div class="basic-button" @click="pushModifier('+')">+</div>
        <div class="basic-button" @click="pushNumber(1)">1</div>
        <div class="basic-button" @click="pushNumber(2)">2</div>
        <div class="basic-button" @click="pushNumber(3)">3</div>
        <div class="basic-button" @click="pushModifier('-')">-</div>
        <div class="basic-button" @click="pushComma('.')">.</div>
        <div class="basic-button" @click="pushNumber(0)">0</div>
        <div class="basic-button" @click="pushModifier('/')">/</div>
        <div class="basic-button" @click="pushModifier('x')">x</div>
        <div
          class="col-start-1 col-end-3 cursor-pointer select-none rounded-md border-b-4 border-My-vivid-magenta bg-My-dark-violet pb-3.5 pt-5 text-center text-xl text-My-white hover:bg-fuchsia-500/50"
          @click="total.value = []"
        >
          RESET
        </div>
        <div
          class="col-start-3 col-end-5 inline-block cursor-pointer select-none rounded-md border-b-4 border-My-soft-cyan bg-My-pure-cyan pb-3.5 pt-5 text-center align-middle text-xl text-black hover:bg-cyan-300"
        >
          =
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Toggle from "./components/Toggle.vue";

let toggle = reactive({
  color: "bg-indigo-400",
  value: false,
});

let total = reactive({
  value: [] as (number | string)[],
});

let equation = [] as (number | string)[];

function pushNumber(value: number) {
  total.value.push(value);
}

function pushComma(value: string) {
  if (total.value.length === 0) {
    total.value.push(0, value);
    return;
  }
  for (let x = 0; x < total.value.length; x++) {
    if (total.value[x] === ".") {
      return;
    }
  }
  total.value.push(value);
}

function del() {
  total.value.pop();
}

function pushTotalInEquation() {
  let x: string = "";
  for (let i = 0; i < total.value.length; i++) {
    x += total.value[i].toString();
  }
  equation.push(Number(x));
}

function pushModifier(modifier: string) {
  const lastItem = equation[equation.length - 1];

  if (
    lastItem &&
    typeof lastItem === "string" &&
    ["-", "/", "x", "+"].includes(lastItem)
  ) {
    equation.pop();
    equation.push(modifier);
    return;
  } else {
    pushTotalInEquation();
    equation.push(modifier);
  }
}
</script>

<style scoped>
.basic-button {
  @apply cursor-pointer select-none rounded-md border-b-4 border-My-dark-magenta bg-My-very-dark-violet-3 pt-4 pb-2.5 text-center align-middle text-4xl hover:bg-purple-600/90;
}
</style>
