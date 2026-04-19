const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,   
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    default: "expense",
  },

  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Expense", expenseSchema);