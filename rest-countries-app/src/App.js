import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";
import Navbar from "./components/Navbar"; // always visible

function App() {
  const isLoggedIn = !!localStorage.getItem("username");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/country/:code"
          element={isLoggedIn ? <CountryDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
