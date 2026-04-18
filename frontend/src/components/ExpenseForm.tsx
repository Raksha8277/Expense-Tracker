import { useState } from "react";

export default function ExpenseForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!title || !amount) return alert("Fill all fields");

    onAdd({ title, amount });
    setTitle("");
    setAmount("");
  };

  return (
    <div className="mt-6 p-5 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">

      
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        ➕ Add New Expense
      </h2>

      
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          className="flex-1 p-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Enter title (e.g. Food, Travel)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="flex-1 p-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Amount (₹)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
        >
          Add
        </button>

      </div>
    </div>
  );
}