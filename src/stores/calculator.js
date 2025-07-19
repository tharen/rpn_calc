import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalculatorStore = defineStore('calculator', () => {
  const stack = ref([])
  const currentInput = ref('0')
  const hasError = ref(false)

  const displayStack = computed(() => {
    // Show last 4 items of the stack for display
    return stack.value.slice(-4)
  })

  function resetInput() {
    currentInput.value = '0'
    hasError.value = false
  }

  function inputDigit(digit) {
    if (hasError.value) resetInput()
    if (currentInput.value === '0') {
      currentInput.value = digit
    } else {
      currentInput.value += digit
    }
  }

  function inputDecimal() {
    if (hasError.value) return
    if (!currentInput.value.includes('.')) {
      currentInput.value += '.'
    }
  }

  function enter() {
    if (hasError.value) return
    stack.value.push(parseFloat(currentInput.value))
    resetInput()
  }

  function allClear() {
    stack.value = []
    resetInput()
  }

  function drop() {
    if (stack.value.length > 0) {
      stack.value.pop()
    }
  }

  function swap() {
    if (stack.value.length >= 2) {
      const [a, b] = [stack.value.pop(), stack.value.pop()]
      stack.value.push(a)
      stack.value.push(b)
    }
  }

  function operate(operator) {
    if (hasError.value) return

    if (stack.value.length < 2) {
      return
    }

    const b = stack.value.pop()
    const a = stack.value.pop()
    let result

    switch (operator) {
      case '+':
        result = a + b
        break
      case '−': // Using minus sign instead of hyphen
        result = a - b
        break
      case '×': // Using multiplication sign
        result = a * b
        break
      case '÷': // Using division sign
        if (b === 0) {
          currentInput.value = 'Error: Div by 0'
          hasError.value = true
          stack.value = []
          return
        }
        result = a / b
        break
      default:
        return
    }
    stack.value.push(result)
  }

  return {
    stack,
    currentInput,
    hasError,
    displayStack,
    inputDigit,
    inputDecimal,
    enter,
    allClear,
    drop,
    swap,
    operate,
  }
})
