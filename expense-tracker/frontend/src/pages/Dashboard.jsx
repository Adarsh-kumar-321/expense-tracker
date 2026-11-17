import { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await API.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransactionAdded = (newTxn) => {
    setTransactions([newTxn, ...transactions]);
  };

  const handleTransactionDeleted = (id) => {
    setTransactions(transactions.filter((txn) => txn._id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      <h2>Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#e2f0cb', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Total Income</h4>
          <p style={{ fontSize: '20px', color: 'green', fontWeight: 'bold' }}>₹{totalIncome}</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#ffdad6', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Total Expense</h4>
          <p style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }}>₹{totalExpense}</p>
        </div>
        <div style={{ flex: 1, padding: '15px', backgroundColor: '#cfe2ff', borderRadius: '8px', textAlign: 'center' }}>
          <h4>Net Balance</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>₹{netBalance}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        <TransactionList transactions={transactions} onDelete={handleTransactionDeleted} />
      </div>
    </div>
  );
};

export default Dashboard;