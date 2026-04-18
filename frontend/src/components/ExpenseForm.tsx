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
    <div className="flex gap-2 mt-4">
      <input 
        className="input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input 
        className="input"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button 
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 rounded hover:scale-105 transition">
        Add
      </button>
    </div>
  );
}