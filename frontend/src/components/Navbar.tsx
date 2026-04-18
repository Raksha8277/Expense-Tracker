import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <button 
        onClick={logout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  );
}