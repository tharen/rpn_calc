<script setup>
import { useCalculatorStore } from '@/stores/calculator'
import { computed } from 'vue'

const store = useCalculatorStore()

const displayValue = computed(() => {
  if (store.hasError) {
    return store.currentInput
  }
  // Format numbers for display
  return Number(store.currentInput).toLocaleString()
})

const stackItems = computed(() => {
  return store.displayStack.map(item => item.toLocaleString())
})

const buttons = [
  'AC', '↔', '⌫', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '−',
  '1', '2', '3', '+',
  '0', '.', 'Enter'
]

function onButtonClick(btn) {
  if (/[0-9]/.test(btn)) {
    store.inputDigit(btn)
  } else if (btn === '.') {
    store.inputDecimal()
  } else if (btn === 'Enter') {
    store.enter()
  } else if (['+', '−', '×', '÷'].includes(btn)) {
    store.operate(btn)
  } else if (btn === 'AC') {
    store.allClear()
  } else if (btn === '⌫') {
    store.drop()
  } else if (btn === '↔') {
    store.swap()
  }
}
</script>

<template>
  <div class="calculator">
    <div class="display">
      <div class="stack">
        <div v-for="(item, index) in stackItems" :key="index" class="stack-item">
          {{ store.stack.length - stackItems.length + index + 1 }}: {{ item }}
        </div>
      </div>
      <div class="current-input" :class="{ 'error-text': store.hasError }">
        {{ displayValue }}
      </div>
    </div>
    <div class="keypad">
      <button
        v-for="btn in buttons"
        :key="btn"
        @click="onButtonClick(btn)"
        :class="['btn', { 'btn-operator': ['÷', '×', '−', '+', 'Enter'].includes(btn) }, { 'btn-zero': btn === '0' }]"
      >
        {{ btn }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  width: 100%;
  max-width: 320px;
  margin: 2rem auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}

.display {
  background-color: #222;
  color: white;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: right;
  font-family: 'Courier New', Courier, monospace;
}

.stack {
  min-height: 100px;
  font-size: 0.9rem;
  color: #aaa;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.stack-item {
  opacity: 0.7;
}

.current-input {
  font-size: 2.5rem;
  font-weight: bold;
  min-height: 50px;
  word-wrap: break-word;
  word-break: break-all;
}

.error-text {
  color: #ff4d4d;
  font-size: 1.5rem;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(60px, auto);
  gap: 1px;
  background-color: #ccc;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
}

.btn {
  padding: 20px 0;
  font-size: 1.5rem;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  background-color: #d5d5d5;
}

.btn:active {
  background-color: #ccc;
}

.btn-operator {
  background-color: #f5923e;
  color: white;
}
.btn-operator:hover {
  background-color: #e4812d;
}
.btn-operator:active {
  background-color: #d3701c;
}

.btn-zero {
  grid-column: span 2;
}
</style>
