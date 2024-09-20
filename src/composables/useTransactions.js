import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';

export function useTransactions() {

  const toast = useToast();
  const transactions = ref([]);

  // Get total
  const total = computed(() => {
    return transactions.value.reduce((accumulator, transactArrayRow) => {
      return accumulator + transactArrayRow.amount;
    }, 0);
  });

  // Get income
  const income = computed(() => {
    return transactions.value
      .filter((transactArrayRow) => transactArrayRow.amount > 0)
      .reduce((accumulator, transactArrayRow) => {
        return accumulator + transactArrayRow.amount;
      }, 0);
  });

  // Get expenses
  const expenses = computed(() => {
    return transactions.value
      .filter((transactArrayRow) => transactArrayRow.amount < 0)
      .reduce((accumulator, transactArrayRow) => {
        return accumulator + transactArrayRow.amount;
      }, 0);
  });

  // Handle adding a transaction
  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
    });
    saveTransactionsToLocalStorage();
    toast.success('Transaction added');
  };

  // Handle deleting a transaction
  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(
      (transactArrayRow) => transactArrayRow.id !== id
    );
    saveTransactionsToLocalStorage();
    toast.success('Transaction deleted');
  };

  // Helper to generate a unique ID
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  // Save transactions to localStorage
  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };

  return {
    transactions,
    total,
    income,
    expenses,
    handleTransactionSubmitted,
    handleTransactionDeleted,
  };
}
