import React, { useState } from 'react';
import axios from 'axios';

export default function TransactionForm({ fetchTransactions }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // LocalStorage me 'user' key ke andar token saved hai, use extract karein
      let token = localStorage.getItem('token');
      if (!token) {
        const storedUser = JSON.parse(localStorage.getItem('user') || localStorage.getItem('userInfo') || '{}');
        token = storedUser.token;
      }

      if (!token) {
        alert('Please login again! Token missing.');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/transactions',
        { title, amount, type, category },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setTitle('');
      setAmount('');
      setCategory('');
      if (fetchTransactions) fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error adding transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '15px', background: '#fff', borderRadius: '8px' }}>
      <h3>Add Transaction</h3>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '8px' }} 
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Amount (₹):</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          style={{ width: '100%', padding: '8px' }} 
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Type:</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Category:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          style={{ width: '100%', padding: '8px' }} 
          required 
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Add Transaction
      </button>
    </form>
  );
}