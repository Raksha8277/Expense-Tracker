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
      alert(" Failed to add transaction");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">

      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        
        <h1 className="text-4xl text-center font-extrabold text-indigo-700">
          Dashboard 
        </h1>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-gray-500 font-semibold">Income</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalIncome}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-gray-500 font-semibold">Expense</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ₹{totalExpense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <h2 className="text-gray-500 font-semibold">Balance</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{balance}
            </p>
          </div>

        </div>

       
        <div className="flex justify-center gap-4 mt-4">

          <button
            onClick={() => setType("expense")}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              type === "expense"
                ? "bg-red-500 text-white shadow-lg scale-105"
                : "bg-red-100 hover:bg-red-200"
            }`}
          >
            💸 Expense
          </button>

          <button
            onClick={() => setType("income")}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              type === "income"
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-green-100 hover:bg-green-200"
            }`}
          >
            📈 Income
          </button>

        </div>

     
        <ExpenseForm onAdd={addExpense} type={type} />

        
        {loading && (
          <p className="text-center text-gray-600 mt-4">
            Loading data...
          </p>
        )}

      </div>
    </div>
  );
}