const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.params.userId });
  res.json(expenses);
};