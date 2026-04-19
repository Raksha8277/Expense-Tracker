import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 
  const addExpense = async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses",
        data
      );

      setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch(() => alert("Failed to load expenses"))
      .finally(() => setLoading(false));
  }, []);

 
  const total = expenses.reduce(
    (sum, e: any) => sum + Number(e.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

       
        <h1 className="text-4xl text-center font-bold text-indigo-700">
          Dashboard 📊
        </h1>

       
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30">
          <h2 className="text-lg text-gray-600">Total Expenses</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ₹{total}
          </p>
        </div>

       
        <ExpenseForm onAdd={addExpense} />

        
        {loading ? (
          <p className="text-center text-gray-600">
            Loading expenses...
          </p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-600">
            No expenses yet 😔
          </p>
        ) : (
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        )}

      </div>
    </div>
  );
}