import { ref, computed } from 'vue';

export function useTransactions() {
  const transactions = ref([]);

  const total = computed(() => {
    return transactions.value.reduce((accumulator, transactArrayRow) => {
      return accumulator + transactArrayRow.amount;
    }, 0);
  });

  const income = computed(() => {
    return transactions.value
      .filter((transactArrayRow) => transactArrayRow.amount > 0)
      .reduce((accumulator, transactArrayRow) => {
        return accumulator + transactArrayRow.amount;
      }, 0);
  });

  const expenses = computed(() => {
    return transactions.value
      .filter((transactArrayRow) => transactArrayRow.amount < 0)
      .reduce((accumulator, transactArrayRow) => {
        return accumulator + transactArrayRow.amount;
      }, 0);
  });

  return { transactions, total, income, expenses };
}
