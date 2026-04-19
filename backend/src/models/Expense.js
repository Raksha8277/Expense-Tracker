const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: { type: Date, default: Date.now },

  // ✅ NEW FIELD
  type: {
    type: String,
    enum: ["income", "expense"],
    default: "expense",
  }
});

module.exports = mongoose.model("Expense", expenseSchema);