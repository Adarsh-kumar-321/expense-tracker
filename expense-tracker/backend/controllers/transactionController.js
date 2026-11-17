const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount: Number(amount),
      type: type.toLowerCase(), // 'Expense' ya 'Income' ko lowercase kar dega
      category,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Add Transaction Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
};