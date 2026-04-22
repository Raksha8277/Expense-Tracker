import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";

const API = `${import.meta.env.VITE_API_URL}/api/expenses`;

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [loading, setLoading] = useState(true);

  const addExpense = async (data: any) => {
    try {
      const res = await axios.post(API, data);
      setExpenses((prev) => [...prev, res.data]);
    } catch {
      alert("Failed to add transaction");
    }
  };

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setExpenses(res.data))
      .catch(() => alert("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e: any) => sum + Number(e.amount), 0);

  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e: any) => sum + Number(e.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-8">

        <h1 className="text-4xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent opacity-0 translate-y-5 animate-[fadeSlideIn_0.6s_ease_forwards]">
          Expense Tracker Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            { title: "Income", value: totalIncome, color: "text-green-600" },
            { title: "Expense", value: totalExpense, color: "text-red-500" },
            { title: "Balance", value: balance, color: "text-blue-600" }
          ].map((card, index) => (

            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40 text-center 
              transform transition duration-300 hover:scale-105 hover:shadow-2xl
              opacity-0 translate-y-5 animate-[fadeSlideIn_0.5s_ease_forwards]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h2 className="text-gray-500 font-medium">{card.title}</h2>
              <p className={`text-3xl font-bold mt-2 ${card.color}`}>
                ₹{card.value}
              </p>
            </div>

          ))}

        </div>

        <div className="flex justify-center gap-5">

          <button
            onClick={() => setType("expense")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform ${
              type === "expense"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                : "bg-white/70 backdrop-blur border border-red-200 text-red-600 hover:bg-red-100 hover:scale-105"
            }`}
          >
             Expense
          </button>

          <button
            onClick={() => setType("income")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform ${
              type === "income"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                : "bg-white/70 backdrop-blur border border-green-200 text-green-600 hover:bg-green-100 hover:scale-105"
            }`}
          >
             Income
          </button>

        </div>

        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40 
        opacity-0 translate-y-5 animate-[fadeSlideIn_0.6s_ease_forwards]"
        style={{ animationDelay: "0.4s" }}>
          <ExpenseForm onAdd={addExpense} type={type} />
        </div>

        {loading && (
          <p className="text-center text-gray-600 animate-pulse">
            Loading data...
          </p>
        )}

      </div>
    </div>
  );
}