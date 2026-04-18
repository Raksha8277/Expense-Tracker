const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  userId: String
});

module.exports = mongoose.model("Expense", expenseSchema);