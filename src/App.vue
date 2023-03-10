<template>
  <div class="min-h-screen w-full" :class="theme.background">
    <div class="mx-auto w-[350px] flex-col pt-24" :class="theme.text">
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
              @emitTheme="(value) => (toggle.value = value)"
            />
          </div>
        </div>
      </div>

      <!--   Total number     -->
      <div
        class="mt-8 rounded-xl py-7 px-5 text-right text-4xl"
        :class="theme.screen"
      >
        <span v-if="current.operand.value !== ''">
          {{ current.operand.value }}
        </span>
        <span v-else>0</span>
      </div>

      <!--   Buttons   -->
      <div
        class="mt-4 grid grid-cols-4 gap-4 rounded-lg p-5"
        :class="theme.calculator"
      >
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('7')"
        >
          7
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('8')"
        >
          8
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('9')"
        >
          9
        </div>
        <div
          class="cursor-pointer select-none rounded-md border-b-4 pb-3.5 pt-5 text-center text-xl"
          :class="theme.delete"
          @click="handleClick('delete')"
        >
          DEL
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('4')"
        >
          4
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('5')"
        >
          5
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('6')"
        >
          6
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('+')"
        >
          +
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('1')"
        >
          1
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('2')"
        >
          2
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('3')"
        >
          3
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('-')"
        >
          -
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('.')"
        >
          .
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('0')"
        >
          0
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('/')"
        >
          /
        </div>
        <div
          class="basic-button"
          :class="theme.button"
          @click="handleClick('*')"
        >
          x
        </div>
        <div
          class="col-start-1 col-end-3 cursor-pointer select-none rounded-md border-b-4 pb-3.5 pt-5 text-center text-xl"
          :class="theme.reset"
          @click="handleClick('reset')"
        >
          RESET
        </div>
        <div
          class="col-start-3 col-end-5 inline-block cursor-pointer select-none rounded-md border-b-4 pb-3.5 pt-5 text-center align-middle text-xl"
          :class="theme.equals"
          @click="handleClick('=')"
        >
          =
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import Toggle from "./components/Toggle.vue";

let theme = reactive({
  text: "text-theme1",
  background: "background-theme1",
  calculator: "calculator-theme1",
  screen: "screen-theme1",
  toggle: "toggle-theme1",
  reset: "button1-theme1",
  delete: "button1-theme1",
  button: "button2-theme1",
  equals: "button3-theme1",
});

let toggle = reactive({
  color: "bg-indigo-400",
  value: 1,
  backgroundColor: theme.toggle,
  bulletColor: theme.equals,
});

watch(
  () => toggle.value,
  (newValue) => {
    theme.text = "text-theme" + newValue;
    theme.background = "background-theme" + newValue;
    theme.calculator = "calculator-theme" + newValue;
    theme.screen = "screen-theme" + newValue;
    theme.toggle = "toggle-theme" + newValue;
    theme.button = "button2-theme" + newValue;
    theme.equals = "button3-theme" + newValue;
    theme.reset = "button1-theme" + newValue;
    theme.delete = "button1-theme" + newValue;
    toggle.backgroundColor = theme.toggle;
    toggle.bulletColor = theme.equals;
  }
);

let equation = "";
let operator = "";
let firstOperand = reactive({
  value: "",
});
let secondOperand = reactive({
  value: "",
});
let current = reactive({
  operand: firstOperand,
});
let answer = reactive({
  value: "",
});

function handleClick(value: string) {
  if (value === "reset") {
    resetCalculator();
    return;
  }
  if (value === "delete") {
    del();
    return;
  }
  if (value === "/" || value === "+" || value === "*" || value === "-") {
    setOperator(value);
    return;
  }
  if (value === ".") {
    setComma();
    return;
  }
  if (value === "=") {
    if (!validation()) {
      return;
    }
    setEquation();
    solveEquation();

    return;
  }
  setOperand(value);
  return;
}

function validation() {
  if (firstOperand.value === "") {
    firstOperand.value = "0";
  }

  if (operator === "" && firstOperand.value !== "") {
    return false;
  }

  if (secondOperand.value === "") {
    secondOperand.value = "0";
  }

  return true;
}

function setComma() {
  if (current.operand.value === "") {
    current.operand.value += "0";
  }
  if (!current.operand.value.includes(".")) {
    current.operand.value += ".";
  }
  return;
}

function setOperand(value: string) {
  current.operand.value += value;
}

function setOperator(value: string) {
  if (current.operand.value === "") {
    setOperand("0");
  }
  operator = value;
  current.operand = secondOperand;
}

function resetCalculator() {
  equation = "";
  operator = "";
  answer.value = "";
  firstOperand.value = "";
  secondOperand.value = "";
  current.operand = firstOperand;
}

function setEquation() {
  let num1 = parseFloat(firstOperand.value);
  let num2 = parseFloat(secondOperand.value);
  equation = num1 + operator + num2;
}

function solveEquation() {
  answer.value = eval(equation).toString().slice(0, 16);
  firstOperand.value = answer.value;
  secondOperand.value = "";
  current.operand = firstOperand;
  return;
}

function del() {
  if (current.operand.value.length > 0) {
    current.operand.value = current.operand.value.substring(
      0,
      current.operand.value.length - 1
    );
  }
}
</script>

<style>
.basic-button {
  @apply cursor-pointer select-none rounded-md border-b-4 pt-4 pb-2.5 text-center align-middle text-4xl;
}
/* Theme 1 - Blue */

.background-theme1 {
  @apply bg-My-very-dark-desaturated-blue-background text-My-white;
}
.calculator-theme1 {
  @apply bg-My-very-dark-desaturated-blue-background-toggle-keypad text-white;
}
.screen-theme1 {
  @apply bg-My-very-dark-desaturated-blue-background-screen text-white;
}
.toggle-theme1 {
  @apply bg-My-very-dark-desaturated-blue-background-toggle-keypad;
}
.button1-theme1 {
  @apply border-My-desaturated-dark-blue-button-shadow bg-My-desaturated-dark-blue-button text-white;
}
.button2-theme1 {
  @apply border-My-grayish-orange-button-shadow bg-My-light-grayish-orange-button text-My-very-dark-grayish-yellow-text;
}
.button3-theme1 {
  @apply border-My-dark-red-button-shadow bg-My-red-button text-white;
}
.text-theme1 {
  @apply text-My-white;
}
.text-theme1-blue {
  @apply text-My-very-dark-grayish-blue-text;
}

/* Theme 2 - Magenta */

.background-theme2 {
  @apply bg-My-light-gray-background;
}
.calculator-theme2 {
  @apply bg-My-grayish-red-background-toggle-keypad;
}
.screen-theme2 {
  @apply bg-My-very-light-gray-background-screen;
}
.toggle-theme2 {
  @apply bg-My-grayish-red-background-toggle-keypad;
}
.button1-theme2 {
  @apply border-My-very-dark-cyan-button-shadow bg-My-dark-moderate-cyan-button text-My-white;
}
.button2-theme2 {
  @apply border-My-dark-grayish-orange-button-shadow bg-My-light-grayish-yellow-button;
}

.button3-theme2 {
  @apply border-My-dark-orange-button-shadow bg-My-orange-button text-My-white;
}
.text-theme2 {
  @apply text-My-very-dark-grayish-yellow-text;
}

/* Theme 3 - Magenta */
.background-theme3 {
  @apply bg-My-very-dark-violet-background;
}
.calculator-theme3 {
  @apply bg-My-very-dark-violet-toggle-keypad-screen-background;
}
.screen-theme3 {
  @apply bg-My-very-dark-violet-toggle-keypad-screen-background;
}
.toggle-theme3 {
  @apply bg-My-very-dark-violet-toggle-keypad-screen-background;
}
.button1-theme3 {
  @apply border-My-vivid-magenta-shadow bg-My-dark-violet-button text-My-white;
}
.button2-theme3 {
  @apply border-My-dark-magenta-shadow bg-My-very-dark-violet-button;
}

.button3-theme3 {
  @apply border-My-soft-cyan-shadow bg-My-pure-cyan-button text-My-very-dark-blue-text;
}

.text-theme3 {
  @apply text-My-light-yellow-text;
}
</style>
