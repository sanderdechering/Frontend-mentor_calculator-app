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
        <span v-for="number in operand.value" v-if="operand.value.length !== 0">
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
        <div class="basic-button" @click="pushOperator('+')">+</div>
        <div class="basic-button" @click="pushNumber(1)">1</div>
        <div class="basic-button" @click="pushNumber(2)">2</div>
        <div class="basic-button" @click="pushNumber(3)">3</div>
        <div class="basic-button" @click="pushOperator('-')">-</div>
        <div class="basic-button" @click="pushComma()">.</div>
        <div class="basic-button" @click="pushNumber(0)">0</div>
        <div class="basic-button" @click="pushOperator('/')">/</div>
        <div class="basic-button" @click="pushOperator('x')">x</div>
        <div
          class="col-start-1 col-end-3 cursor-pointer select-none rounded-md border-b-4 border-My-vivid-magenta bg-My-dark-violet pb-3.5 pt-5 text-center text-xl text-My-white hover:bg-fuchsia-500/50"
          @click="resetEquation"
        >
          RESET
        </div>
        <div
          class="col-start-3 col-end-5 inline-block cursor-pointer select-none rounded-md border-b-4 border-My-soft-cyan bg-My-pure-cyan pb-3.5 pt-5 text-center align-middle text-xl text-black hover:bg-cyan-300"
          @click="evaluateEquation"
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
// declared as a reactive array. When users add numbers to the operand, the numbers can be displayed on the calculator via a for.
let operand = reactive({
  value: [] as (number | string)[],
});

// declared as an array, because this way we can shift the equation easily when resolving.
// ["234.2", "-", "54']
// ["234.2", "-"]
// ["234.2"]
let equation = [] as (number | string)[];

function pushNumber(value: number) {
  operand.value.push(value);
}

function pushComma() {
  if (operand.value.length === 0) {
    operand.value.push(0, ".");
    return;
  }
  for (let x = 0; x < operand.value.length; x++) {
    if (operand.value[x] === ".") {
      return;
    }
  }
  operand.value.push(".");
}

function del() {
  operand.value.pop();
}

function resetEquation() {
  equation.splice(0);
  operand.value.splice(0);
}

function pushOperandInEquation() {
  let x: string = "";

  if (operand.value.length === 0) {
    operand.value.push(0);
  }

  for (let i = 0; i < operand.value.length; i++) {
    x += operand.value[i].toString();
  }

  equation.push(Number(x));
}

function pushOperator(modifier: string) {
  const lastItem = equation[equation.length - 1];
  // checking if the last item is an operator, so we can replace the operator with the new one.
  if (
    lastItem &&
    typeof lastItem === "string" &&
    ["-", "/", "x", "+"].includes(lastItem)
  ) {
    equation.pop();
  }
  // checking if the first item in the equation is not a number
  if (typeof equation[0] !== "number") {
    pushOperandInEquation();
  }
  equation.push(modifier);
  // here we remove the operand, because we need to add the second part of the equation so t
  operand.value.splice(0);
}
function getDigitsArray(num: number): number[] {
  const digitsStr = num.toString(); // Convert number to string
  // Split string into array of characters, then convert each character to a number
  return digitsStr.split("").map(Number);
}

function evaluateEquation() {
  pushOperandInEquation();

  while (equation.length > 1) {
    const left = equation.shift() as number;
    const operator = equation.shift() as string;
    const right = equation.shift() as number;

    let result = 0;
    switch (operator) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
      case "x":
        result = left * right;
        break;
      case "/":
        result = left / right;
        break;
      default:
        break;
    }

    let digits: string | any[] = [];

    // if result is longer than 11 digits long
    if (result.toString().length > 11) {
      // make a rounded string from result
      digits = result.toFixed(8);

      digits = digits.split("").map(Number);

      // make a rounded number from result
      result = parseFloat(result.toFixed(8));
    } else {
      digits = result.toString();
      digits = digits.split("").map(Number);
    }

    operand.value.splice(0);

    // pushing all digits into operand
    for (let x = 0; x < digits.length; x++) {
      // here we check of the first digit is NaN. This means the first digit in result was a minus
      if (x === 0) {
        if (Number.isNaN(digits[x])) {
          digits[x] = "-";
          operand.value.push(digits[x]);
          continue;
        }
      }
      // here we check of the first digit is NaN. This means the first digit in result was a comma
      if (Number.isNaN(digits[x])) {
        digits[x] = ",";
        operand.value.push(digits[x]);
        continue;
      }
      operand.value.push(digits[x]);
    }

    equation.push(result);
  }
}
</script>

<style scoped>
.basic-button {
  @apply cursor-pointer select-none rounded-md border-b-4 border-My-dark-magenta bg-My-very-dark-violet-3 pt-4 pb-2.5 text-center align-middle text-4xl hover:bg-purple-600/90;
}
</style>
