<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+P{{ income.toFixed(2) }}</p>  <!--toFixed = converts number to string format 2 decimal-->
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">-P{{ expenses.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    income:{ type: Number, required: true },
    expenses:{ type: Number, required: true }
  })
</script>