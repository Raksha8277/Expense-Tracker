import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  
  const addExpense = async (data: any) => {
    const res = await axios.post("http://localhost:5000/api/expenses", {
      ...data,
      userId,
    });
    setExpenses([...expenses, res.data]);
  };


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${userId}`)
      .then((res) => setExpenses(res.data));
  }, []);

  
  const total = expenses.reduce(
    (sum, e: any) => sum + Number(e.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

       
        <h1 className="text-4xl font-bold text-indigo-700 mb-6">
          Dashboard 📊
        </h1>

       
        <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30 mb-6">
          <h2 className="text-lg text-gray-600">Total Expenses</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ₹{total}
          </p>
        </div>

        
        <ExpenseForm onAdd={addExpense} />

        
        <ExpenseList expenses={expenses} setExpenses={setExpenses} />

      </div>
    </div>
  );
}