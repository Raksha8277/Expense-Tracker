import { useState } from "react";
import axios from "axios";

export default function ExpenseList({ expenses, setExpenses }: any) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", amount: "" });

  
  const deleteExpense = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    setExpenses(expenses.filter((e: any) => e._id !== id));
  };


  const startEdit = (e: any) => {
    setEditId(e._id);
    setEditData({ title: e.title, amount: e.amount });
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
    <div className="mt-6">

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No expenses yet 😔
        </p>
      ) : (
        <div className="grid gap-4">

          {expenses.map((e: any) => (
            <div
              key={e._id}
              className="p-4 bg-white/50 backdrop-blur-lg rounded-2xl shadow-md flex justify-between items-center"
            >

             
              {editId === e._id ? (
                <div className="flex gap-2 w-full">

                  <input
                    value={editData.title}
                    onChange={(ev) =>
                      setEditData({ ...editData, title: ev.target.value })
                    }
                    className="input"
                  />

                  <input
                    value={editData.amount}
                    onChange={(ev) =>
                      setEditData({ ...editData, amount: ev.target.value })
                    }
                    className="input"
                  />

                  <button
                    onClick={() => saveEdit(e._id)}
                    className="bg-green-500 text-white px-3 rounded"
                  >
                    Save
                  </button>

                </div>
              ) : (
                <>
                 
                  <div>
                    <p className="font-semibold text-lg">{e.title}</p>
                    <p className="text-indigo-600 font-bold">₹{e.amount}</p>
                  </div>

                  
                  <div className="flex gap-2">

                    <button
                      onClick={() => startEdit(e)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:scale-105"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(e._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:scale-105"
                    >
                      Delete

                    </button>

                  </div>
                </>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}