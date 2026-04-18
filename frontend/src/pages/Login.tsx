import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      navigate("/dashboard"); // ✅ FIXED
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input className="input" placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})}/>

        <input className="input" type="password" placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})}/>

        <button onClick={login}
          className="bg-indigo-500 text-white w-full py-2 rounded hover:scale-105 transition">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500"> Signup</Link>
        </p>
      </div>
    </div>
  );
}