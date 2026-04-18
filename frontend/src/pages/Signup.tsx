import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", data);
      alert("Signup success");
      navigate("/"); 
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">

      
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-8 rounded-3xl shadow-2xl w-80">

        
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account ✨
        </h2>

        
        <input
          className="w-full p-3 rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          placeholder="Name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        
        <input
          className="w-full p-3 rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        
        <input
          className="w-full p-3 rounded-xl mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          type="password"
          placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        
        <button
          onClick={signup}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
        >
          Signup
        </button>

       
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-white/40"></div>
          <span className="px-2 text-white text-sm">or</span>
          <div className="flex-1 h-px bg-white/40"></div>
        </div>

        
        <p className="text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/" className="font-semibold underline hover:text-yellow-200">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}