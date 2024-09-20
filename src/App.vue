<template>
  <Header />
  <div class="container">
    <Balance :total="total" />                                    <!-- Props passed -->
    <IncomeExpenses :income="income" :expenses="expenses"/>       <!-- Props passed -->
    <TransactionList :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"/>            <!-- Props passed and emit custom event -->
    <AddTransaction
      @transactionSubmitted="handleTransactionSubmitted" />       <!-- Emit Cumstom Event transactionSubmitted -->
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { onMounted } from 'vue'

onMounted(()=> {                                                                    //Check LocalStorage on mounting the component
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));       //Get the parsed data from localStorage (string format)
  if (savedTransactions) {
    transactions.value = savedTransactions                                          //Save the data to transactions array (for javascript)
  }
})

// Import the composable
import { useTransactions } from './composables/useTransactions';
const {
  transactions,
  total,
  income,
  expenses,
  handleTransactionSubmitted,
  handleTransactionDeleted,
} = useTransactions();

</script>