<template>
  <Header />
  <div class="container">
    <Balance :total="total" />                                            <!-- Props passed -->
    <IncomeExpenses :income="income" :expenses="expenses"/>
    <TransactionList :transactions="transactions" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" /> <!-- Emit Cumstom Event transactionSubmitted -->
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

//Get total
const total = computed(()=> {
  const transactArray = transactions.value              //Beginners only
  return transactArray
    .reduce((accumulator, transactArrayRow)=> {         //Iterates over each element in transactArray and accumulate the values(ex. amount) into a single value
      return accumulator + transactArrayRow.amount      //For each transactArrayRow, the amount property is added to the accumulator
    }, 0)                                               //Initial value of accumulator
})

//Get Income
const income = computed(()=> {
  return transactions.value
    .filter((transactArrayRow)=> transactArrayRow.amount > 0)     //Add a filter for ammount greater than 0
    .reduce((accumulator, transactArrayRow)=> {                   //Reduce filtered amount
      return accumulator + transactArrayRow.amount
    }, 0)
    .toFixed(2)                                                  //Fomat result to two decimal places
})

//Get expenses
const expenses = computed(()=> {
  return transactions.value
    .filter((transactArrayRow)=> transactArrayRow.amount < 0)     //Add a filter for ammount greater less than 0
    .reduce((accumulator, transactArrayRow)=> {
      return accumulator + transactArrayRow.amount
    }, 0)
    .toFixed(2)
})

//Add Transaction
const handleTransactionSubmitted = (transactionData)=> {
  console.log('from emit', transactionData)
}
</script>