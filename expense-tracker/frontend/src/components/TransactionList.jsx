import API from '../services/api';

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map((txn) => (
            <li key={txn._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <div>
                <strong>{txn.title}</strong> ({txn.category})<br />
                <small style={{ color: '#666' }}>{new Date(txn.date).toLocaleDateString()}</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: txn.type === 'income' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {txn.type === 'income' ? '+' : '-'}₹{txn.amount}
                </span>
                <button 
                  onClick={() => handleDelete(txn._id)} 
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;