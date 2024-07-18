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
      {{ transaction.text }}<span>{{ transaction.amount }}</span> <button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      transactions: [
        {id: 1, text: 'Item1', amount: -19.99},
        {id: 2, text: 'Salary', amount: 799.97},
        {id: 2, text: 'Item2', amount: -10},
        {id: 2, text: 'Sale', amount: 150}
      ]
    }
  },
}
</script>



