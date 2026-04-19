import { useState } from "react";

export default function ExpenseForm({ onAdd, type }: any) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");


  const expenseCategories = [
    "Food 🍔",
    "Travel ✈️",
    "Shopping 🛍️",
    "Bills 💡",
    "Health 🏥",
    "Entertainment 🎬",
    "Education 📚",
    "Others"
  ];

 
  const incomeCategories = [
    "Salary 💼",
    "Freelance 💻",
    "Business 🏢",
    "Investment 📈",
    "Gift 🎁",
    "Bonus 💰",
    "Other"
  ];

  const categories =
    type === "expense" ? expenseCategories : incomeCategories;

  const handleSubmit = () => {
    if (!amount || !category) {
      return alert("Select category and enter amount");
    }

    onAdd({
      amount,
      category,
      type
    });

    setAmount("");
    setCategory("");
  };

  return (
    <div className="mt-6 p-6 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border">

      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        Add {type === "expense" ? "Expense " : "Income "}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Category */}
        <select
          className="p-3 rounded-xl bg-white border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

       
        <input
          className="p-3 rounded-xl bg-white border"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        
        <button
          onClick={handleSubmit}
          className={`rounded-xl text-white font-semibold ${
            type === "expense"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Add
        </button>

      </div>
    </div>
  );
}