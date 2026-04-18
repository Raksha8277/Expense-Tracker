import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/20">

      {/* Logo / Title */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
        💰 Expense Tracker
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User badge (optional) */}
        <span className="hidden sm:block text-gray-700 font-medium">
          Welcome 👋
        </span>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
        >
          Logout
        </button>
      </div>

    </div>
  );
}