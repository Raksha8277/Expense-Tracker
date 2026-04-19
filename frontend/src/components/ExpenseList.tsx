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
        <p className="text-center text-gray-500 mt-10">
          No transactions yet 😔
        </p>
      ) : (
        expenses.map((e: any) => (
          <div
            key={e._id}
            className="p-4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition duration-300"
          >

            
            {editId === e._id ? (
              <div className="flex gap-2 w-full">

                <input
                  value={editData.category}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      category: ev.target.value
                    })
                  }
                  className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <input
                  value={editData.amount}
                  onChange={(ev) =>
                    setEditData({
                      ...editData,
                      amount: ev.target.value
                    })
                  }
                  className="w-28 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                  onClick={() => saveEdit(e._id)}
                  className="px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>

              </div>
            ) : (
              <>
                
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {e.category}
                  </p>

                  <p
                    className={`text-md font-bold ${
                      e.type === "expense"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    ₹{e.amount}
                  </p>
                </div>

                
                <div className="flex gap-2">

                  <button
                    onClick={() => startEdit(e)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
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