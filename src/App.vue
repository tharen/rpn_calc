<script setup>
import RpnCalculator from './components/RpnCalculator.vue'
</script>

<template>
  <main>
    <RpnCalculator />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

@media (min-width: 1024px) {
  main {
    padding: 2rem;
  }
}
</style>
