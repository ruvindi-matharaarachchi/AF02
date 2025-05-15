import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      navigate("/home"); // ✅ Redirect to home
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 p-6 transition-all duration-500">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md animate-fade-in-down">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 animate-pulse">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transform transition-transform duration-300"
          >
            Login
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-red-600 animate-fade-in">
            {message}
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline transition-colors duration-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
