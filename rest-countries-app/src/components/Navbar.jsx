import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaSignOutAlt, FaUserCircle, FaGlobeAsia } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [favoriteCount] = useState(0);

  // Listen for login/logout changes
  useEffect(() => {
    const checkUsername = () => {
      const stored = localStorage.getItem("username");
      setUsername(stored);
    };

    // Check once at mount
    checkUsername();

    // Listen to storage changes from other tabs or manual changes
    window.addEventListener("storage", checkUsername);

    // Optional: re-check on interval (for reliability)
    const interval = setInterval(checkUsername, 500);

    return () => {
      window.removeEventListener("storage", checkUsername);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-sky-600 to-blue-400 px-6 py-4 shadow-xl">
      <div className="flex justify-between items-center">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          <FaGlobeAsia className="text-white text-3xl" />
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-yellow-100 tracking-wide transition-all duration-300"
          >
            Explore Countries
          </Link>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-6">
          <div className="relative group transition-transform duration-300 hover:scale-110 cursor-pointer">
            <FaStar className="text-yellow-300 text-2xl" />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                {favoriteCount}
              </span>
            )}
            <span className="absolute left-0 top-full mt-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Favorites
            </span>
          </div>

          {username ? (
            <>
              <div className="flex items-center gap-2 text-white font-medium">
                <FaUserCircle className="text-2xl text-blue-200" />
                <span className="text-sm">Hi, {username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm text-white hover:text-yellow-200 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
