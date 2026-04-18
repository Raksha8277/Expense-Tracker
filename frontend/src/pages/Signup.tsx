import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({ name:"", email:"", password:"" });

  const signup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", data);
    alert("Signup success");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input className="input" placeholder="Name"
          onChange={e => setData({...data, name:e.target.value})}/>

        <input className="input" placeholder="Email"
          onChange={e => setData({...data, email:e.target.value})}/>

        <input className="input" type="password" placeholder="Password"
          onChange={e => setData({...data, password:e.target.value})}/>

        <button onClick={signup}
          className="bg-blue-500 text-white w-full py-2 rounded hover:scale-105 transition">
          Signup
        </button>
      </div>
    </div>
  );
}