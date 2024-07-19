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
const text = ref('')
const amount = ref('')

//For Vue Toast
import { useToast } from 'vue-toastification';
const toast = useToast()

const emit = defineEmits(['transactionSubmitted'])           //Declare the custom event name the component will emit.
const onSubmit = ()=> {
  if (!text.value && !amount.value) {
    toast.error('Both fields must be filled')
    return
  } else {
    const transactionData = {                                //Data to be emitted
      text: text.value,
      amount: parseFloat(amount.value)                       //Convert to float - default is string
    }
    emit('transactionSubmitted', transactionData)            //triggering event transactionSubmitted and passing transactionData

    text.value = ''
    amount.value = ''
  }
}

</script>