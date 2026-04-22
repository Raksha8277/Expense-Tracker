import { useState } from "react";
import axios from "axios";

export default function ExpenseList({ expenses, setExpenses }: any) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    category: "",
    amount: ""
  });

  const deleteExpense = async (id: string) => {
    if (!window.confirm("Delete this transaction?")) return;

    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    setExpenses(expenses.filter((e: any) => e._id !== id));
  };

  const startEdit = (e: any) => {
    setEditId(e._id);
    setEditData({
      category: e.category,
      amount: e.amount
    });
  };

  const saveEdit = async (id: string) => {
    const res = await axios.put(
      `http://localhost:5000/api/expenses/${id}`,
      editData
    );

    const updatedList = expenses.map((e: any) =>
      e._id === id ? res.data : e
    );

    setExpenses(updatedList);
    setEditId(null);
  };

  return (
    <div className="mt-6 space-y-4">

      {expenses.length === 0 ? (
  <div className="text-center text-gray-500 mt-10 text-lg animate-fadeIn">
    No transactions yet
  </div>
) : (
  expenses.map((e: any, index: number) => (
    <div
      key={e._id}
      className="flex justify-between items-center p-5 rounded-2xl bg-white/80 backdrop-blur-xl shadow-md border border-white/40 
      hover:shadow-xl hover:scale-[1.01] 
      transition-all duration-300 
      opacity-0 translate-y-5 animate-[fadeSlideIn_0.5s_ease_forwards]"
      style={{ animationDelay: `${index * 0.1}s` }} 
    >

            {editId === e._id ? (
              <div className="flex gap-3 w-full">

                <input
                  value={editData.category}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      category: ev.target.value
                    })
                  }
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />

                <input
                  value={editData.amount}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      amount: ev.target.value
                    })
                  }
                  className="w-32 p-3 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />

                <button
                  onClick={() => saveEdit(e._id)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  Save
                </button>

              </div>
            ) : (
              <>
                
                <div className="flex flex-col">

                  <span className="text-lg font-semibold text-gray-800 tracking-wide">
                    {e.category}
                  </span>

                  <span
                    className={`text-lg font-bold mt-1 ${
                      e.type === "expense"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    ₹{e.amount}
                  </span>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => startEdit(e)}
                    className="px-4 py-1.5 rounded-full bg-blue-500/90 text-white text-sm font-medium shadow hover:bg-blue-600 hover:scale-105 transition"
                  >
                     Edit
                  </button>

                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="px-4 py-1.5 rounded-full bg-red-500/90 text-white text-sm font-medium shadow hover:bg-red-600 hover:scale-105 transition"
                  >
                     Delete
                  </button>

                </div>
              </>
            )}

          </div>
        ))
      )}
    </div>
  );
}