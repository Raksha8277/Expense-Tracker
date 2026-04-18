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

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-8 rounded-3xl shadow-2xl w-80">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          className="w-full p-3 rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        {/* Password */}
        <input
          className="w-full p-3 rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          type="password"
          placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={login}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-white/40"></div>
          <span className="px-2 text-white text-sm">or</span>
          <div className="flex-1 h-px bg-white/40"></div>
        </div>

        {/* Signup link */}
        <p className="text-sm text-center text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold underline hover:text-yellow-200">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}