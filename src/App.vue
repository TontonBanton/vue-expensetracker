<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref } from 'vue'
const transactions = ref([
    {id: 1, text: 'Item1', amount: -19.99},
    {id: 2, text: 'Salary', amount: 799.97},
    {id: 2, text: 'Item2', amount: -10},
    {id: 2, text: 'Sale', amount: 150}
])
</script>