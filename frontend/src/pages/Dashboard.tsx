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
      alert("Failed to add transaction");
    }
  };

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses")
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

        
        <h1 className="text-4xl text-center font-bold text-indigo-700">
          Dashboard 📊
        </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          
          <div className="bg-green-100 p-5 rounded-xl shadow">
            <h2 className="text-gray-600">Income</h2>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalIncome}
            </p>
          </div>

         
          <div className="bg-red-100 p-5 rounded-xl shadow">
            <h2 className="text-gray-600">Expense</h2>
            <p className="text-2xl font-bold text-red-600">
              ₹{totalExpense}
            </p>
          </div>

          
          <div className="bg-blue-100 p-5 rounded-xl shadow">
            <h2 className="text-gray-600">Balance</h2>
            <p className="text-2xl font-bold text-blue-600">
              ₹{balance}
            </p>
          </div>

        </div>

        {/* ➕ Add Form */}
        <ExpenseForm onAdd={addExpense} />

        
        {loading ? (
          <p className="text-center text-gray-600">
            Loading...
          </p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-600">
            No transactions yet 😔
          </p>
        ) : (
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        )}

      </div>
    </div>
  );
}