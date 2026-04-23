import { useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/expenses`;

export default function ExpenseList({ expenses, setExpenses }: any) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    category: "",
    amount: ""
  });

  const deleteExpense = async (id: string) => {
    if (!window.confirm("Delete this transaction?")) return;

    await axios.delete(`${API}/${id}`);
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
    const res = await axios.put(`${API}/${id}`, editData);

    const updatedList = expenses.map((e: any) =>
      e._id === id ? res.data : e
    );

    setExpenses(updatedList);
    setEditId(null);
  };

  return (
    <div className="mt-6 space-y-4 px-2 sm:px-0">

      {expenses.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No transactions found.
        </div>
      ) : (
        expenses.map((e: any, index: number) => (
          <div
            key={e._id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center 
            gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-xl shadow-md border border-white/40 
            hover:shadow-xl transition-all duration-300"
          >

            {editId === e._id ? (
              <div className="flex flex-col sm:flex-row gap-3 w-full">

                <input
                  value={editData.category}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      category: ev.target.value
                    })
                  }
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <input
                  value={editData.amount}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      amount: ev.target.value
                    })
                  }
                  className="w-full sm:w-32 p-3 rounded-xl border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                  onClick={() => saveEdit(e._id)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md"
                >
                  Save
                </button>

              </div>
            ) : (
              <>
                {/* LEFT SIDE */}
                <div className="flex flex-col">

                  <span className="text-lg font-semibold text-gray-800">
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

                {/* RIGHT SIDE BUTTONS */}
                <div className="flex flex-row sm:flex-row gap-2 sm:gap-3 justify-end">

                  <button
                    onClick={() => startEdit(e)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium"
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