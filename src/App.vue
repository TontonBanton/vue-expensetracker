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

import { ref, computed, onMounted } from 'vue'
//For Vue Toast
import { useToast } from 'vue-toastification';
const toast = useToast()

/* const transactions = ref([
    {id: 1, text: 'Item1', amount: -319.99},
    {id: 2, text: 'Salary', amount: 999.97},
    {id: 3, text: 'Item2', amount: -10},
    {id: 4, text: 'Sale', amount: 350}
])
 */

const transactions = ref([])
onMounted(()=> {                                                                    //Check LocalStorage on mounting the component
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));       //Get the parsed data from localStorage (string format)
  if (savedTransactions) {
    transactions.value = savedTransactions                                          //Save the data to transactions array (for javascript)
  }
})

// Save transactions to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));        //Save the data to localStorage as string
};


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
    .filter((transactArrayRow)=> transactArrayRow.amount > 0)     //filter the array for ammount greater than 0
    .reduce((accumulator, transactArrayRow)=> {                   //Reduce filtered amount
      return accumulator + transactArrayRow.amount
    }, 0)
})

//Get expenses
const expenses = computed(()=> {
  return transactions.value
    .filter((transactArrayRow)=> transactArrayRow.amount < 0)    //filter the array for ammount greater less than 0
    .reduce((accumulator, transactArrayRow)=> {
      return accumulator + transactArrayRow.amount
    }, 0)
})

//Add Emit handler - get transactionData from AddTransaction
const handleTransactionSubmitted = (transactionData)=> {
  transactions.value.push({                                      //Push emitted data to transactions array
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })
  saveTransactionsToLocalStorage()                              //Save to localStorage
  toast.success('Transaction added')                            //Toast notification
}
const generateUniqueId = ()=> {
  return Math.floor(Math.random() * 1000000)                    //Note: Make other duplicateproof code
}

//Delete Emit handler - get id to be deleted from TransactionList
const handleTransactionDeleted = (id)=> {
  transactions.value = transactions.value
    .filter((transactArrayRow)=> transactArrayRow.id !==id)     //filter the array for row where id not equal to id passed by emit

  saveTransactionsToLocalStorage()                              //Save to localStorage
  toast.success('Transaction deleted')
}
</script>