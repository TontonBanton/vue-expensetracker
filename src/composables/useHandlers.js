import { useToast } from 'vue-toastification';

export function useHandlers(transactions) {
  const toast = useToast();

  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
    });
    saveTransactionsToLocalStorage();
    toast.success('Transaction added');
  };

  const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(
      (transactArrayRow) => transactArrayRow.id !== id
    );
    saveTransactionsToLocalStorage();
    toast.success('Transaction deleted');
  };

  const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
  };

  return { handleTransactionSubmitted, handleTransactionDeleted };
}
