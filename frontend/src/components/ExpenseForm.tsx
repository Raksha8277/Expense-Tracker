import { useState } from "react";

export default function ExpenseForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // ✅ NEW

  const handleSubmit = () => {
    if (!title || !amount) return alert("Fill all fields");

    onAdd({ title, amount, type }); // ✅ send type also
    setTitle("");
    setAmount("");
    setType("expense");
  };

  return (
    <div className="mt-6 p-5 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">

      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        Add Transaction
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">

        <input
          className="flex-1 p-3 rounded-xl bg-white/80"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="flex-1 p-3 rounded-xl bg-white/80"
          placeholder="Amount (₹)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />


        <select
          className="p-3 rounded-xl bg-white/80"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-xl bg-indigo-500 text-white"
        >
          Add
        </button>

      </div>
    </div>
  );
}