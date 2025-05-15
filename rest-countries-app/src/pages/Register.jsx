import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { username, password });
      setMessage(" Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 transition-all duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 animate-pulse">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transform transition-transform duration-300"
          >
            Register
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-gray-600 animate-fade-in">
            {message}
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline transition-colors duration-300"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
