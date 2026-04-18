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
      userId
    });
    setExpenses([...expenses, res.data]);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/expenses/${userId}`)
      .then(res => setExpenses(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <ExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}