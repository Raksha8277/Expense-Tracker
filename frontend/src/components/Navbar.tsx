import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-xl shadow-lg border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">

      <div className="flex justify-between items-center px-6 py-3">

        
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          Expense Tracker
        </h1>

        
        <div className="hidden md:flex gap-4">

          <button
            onClick={() => navigate("/expenses")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform ${
              location.pathname === "/expenses"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                : "bg-white text-red-500 border border-red-200 hover:bg-red-100 hover:scale-105"
            }`}
          >
             Expense History
          </button>

          <button
            onClick={() => navigate("/income")}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 transform ${
              location.pathname === "/income"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-100 hover:scale-105"
            }`}
          >
            Income History
          </button>

        </div>

        
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl transition-transform duration-300 hover:scale-110"
        >
          ☰
        </button>

      </div>

     
      <div
        className={`md:hidden px-6 overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        <div className="flex flex-col gap-3 mt-2">

          <button
            onClick={() => {
              navigate("/expenses");
              setOpen(false);
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              location.pathname === "/expenses"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                : "bg-white text-red-500 border border-red-200 hover:bg-red-100"
            }`}
          >
             Expense History
          </button>

          <button
            onClick={() => {
              navigate("/income");
              setOpen(false);
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              location.pathname === "/income"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-100"
            }`}
          >
            Income History
          </button>

        </div>
      </div>

    </div>
  );
}
