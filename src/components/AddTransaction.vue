<template>
  <h3>Add new transaction</h3>

  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" v-model="text" id="text" placeholder="Enter text...">
    </div>
    <div class="form-control">
      <label for="amount">Amount<br/> (negative - expense, positive - income)</label>
      <input type="text" v-model="amount" id="amount" placeholder="Enter amount...">
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification';

const toast = useToast()
const text = ref('')
const amount = ref('')
const emit = defineEmits(['transactionSubmitted'])
const onSubmit = ()=> {
  //Early Exit
  if (!text.value && !amount.value) return toast.error('Both fields must be filled')

  emit('transactionSubmitted', {
    text: text.value,
    amount: parseFloat(amount.value)
  })

  text.value = ''
  amount.value = ''
}

</script>