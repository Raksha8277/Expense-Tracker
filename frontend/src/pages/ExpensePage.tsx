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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Expense List 
        </h1>

        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      </div>

      <div className="flex justify-center pb-6">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 shadow"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}