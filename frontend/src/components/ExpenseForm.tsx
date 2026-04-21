import { useState } from "react";

export default function ExpenseForm({ onAdd, type }: any) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Health",
    "Entertainment",
    "Education",
    "Others"
  ];

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Gift",
    "Bonus",
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
    <div className="mt-6 p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 transition-all duration-300">

      
      <h2 className="text-xl font-bold text-gray-700 mb-5 text-center">
        Add {type === "expense" ? "Expense " : "Income "}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        
        <select
          className="p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
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
          className="p-3 rounded-xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

       
        <button
          onClick={handleSubmit}
          className={`py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 transform hover:scale-105 ${
            type === "expense"
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-red-300"
              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-300"
          }`}
        >
           Add {type === "expense" ? "Expense" : "Income"}
        </button>

      </div>
    </div>
  );
}