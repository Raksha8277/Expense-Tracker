import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";

const API = "https://expense-tracker-d8ww.onrender.com/api/expenses";

export default function IncomePage() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API)
      .then(res => {
        const onlyIncome = res.data.filter((e: any) => e.type === "income");
        setExpenses(onlyIncome);
      })
      .catch(() => alert("Failed to load income"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Income History 
        </h1>

        <div className="flex justify-right">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Back to Dashboard
          </button>
        </div>

        {/* CARD CONTAINER */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40">

          <ExpenseList expenses={expenses} setExpenses={setExpenses} />

        </div>

        {/* BACK BUTTON */}
        

      </div>
    </div>
  );
}