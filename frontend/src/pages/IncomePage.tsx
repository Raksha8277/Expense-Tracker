import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";

export default function IncomePage() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then(res => {
        const onlyIncome = res.data.filter((e: any) => e.type === "income");
        setExpenses(onlyIncome);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Income List 💰
        </h1>

        <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      </div>

      <button
  onClick={() => navigate("/")}
  className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
>
  ⬅ Back
</button>
    </div>
  );
}