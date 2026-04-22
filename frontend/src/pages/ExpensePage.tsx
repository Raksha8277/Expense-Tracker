import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";

const API = "https://expense-tracker-d8ww.onrender.com/api/expenses";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API)
      .then(res => {
        const onlyExpense = res.data.filter((e: any) => e.type === "expense");
        setExpenses(onlyExpense);
      })
      .catch(() => alert("Failed to load expenses"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Expense History 
        </h1>

        <div className="flex justify-right">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
             Back to Dashboard
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40">
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </div>

      </div>
    </div>
  );
}