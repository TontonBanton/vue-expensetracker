<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
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

import { ref, computed } from 'vue'
const transactions = ref([
    {id: 1, text: 'Item1', amount: -119.99},
    {id: 2, text: 'Salary', amount: 999.97},
    {id: 2, text: 'Item2', amount: -10},
    {id: 2, text: 'Sale', amount: 150}
])

const total = computed(()=> {
  const transactArray = transactions.value                            //No need if not beginner

  return transactArray.reduce(                                       //Reduce method iterates over each element in transactArray.
    //Reduce Callback function
    (accumulator, transactArrayRow)=> {
    return accumulator + transactArrayRow.amount                      //For each transactArrayRow, the amount property is added to the accumulator
  }, 0)                                                               //Initial value of accumulator
})

</script>