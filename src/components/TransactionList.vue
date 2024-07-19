<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <!--
      <li class="minus">
        Cash<span>P10,000.00</span> <button class="delete-btn">x</button>
      </li>
      <li class="plus">
        Dividend<span>P100,000.00</span> button class="delete-btn">x</button>
      </li>
      -->
    <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'">
      {{ transaction.text }}<span>{{ transaction.amount }}</span>
      <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['transactionDeleted'])
const deleteTransaction = (id)=> {
  emit('transactionDeleted', id)
}
</script>



