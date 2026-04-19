import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white/30 backdrop-blur-lg shadow-lg">

      <h1 
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        Expense Tracker
      </h1>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/expenses")}
          className="px-4 py-2 bg-red-200 rounded"
        >
          Expense
        </button>

        <button
          onClick={() => navigate("/income")}
          className="px-4 py-2 bg-green-200 rounded"
        >
          Income
        </button>

      </div>
    </div>
  );
}
