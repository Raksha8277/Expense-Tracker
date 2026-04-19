import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-lg shadow-md border-b border-gray-200 sticky top-0 z-50">

      <div className="flex justify-between items-center px-6 py-3">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent cursor-pointer"
        >
          Expense Tracker
        </h1>

        
        <div className="hidden md:flex gap-3">

          <button
            onClick={() => navigate("/expenses")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              location.pathname === "/expenses"
                ? "bg-red-500 text-white shadow-md"
                : "bg-red-100 text-red-600 hover:bg-red-200"
            }`}
          >
           
          </button>

          <button
            onClick={() => navigate("/income")}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              location.pathname === "/income"
                ? "bg-green-500 text-white shadow-md"
                : "bg-green-100 text-green-600 hover:bg-green-200"
            }`}
          >
            
          </button>

        </div>

       
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

     
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">

          <button
            onClick={() => {
              navigate("/expenses");
              setOpen(false);
            }}
            className={`px-4 py-2 rounded-xl font-medium ${
              location.pathname === "/expenses"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-600"
            }`}
          >
            Expense History
          </button>

          <button
            onClick={() => {
              navigate("/income");
              setOpen(false);
            }}
            className={`px-4 py-2 rounded-xl font-medium ${
              location.pathname === "/income"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-600"
            }`}
          >
            Income History
          </button>

        </div>
      )}
    </div>
  );
}
