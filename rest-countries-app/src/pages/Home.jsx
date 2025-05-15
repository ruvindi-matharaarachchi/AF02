import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCountries,
  searchCountryByName,
  getCountriesByRegion,
} from "../api/countries";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CountryCard from "../components/CountryCard";
import { FaHeart, FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";

function Home() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
      getAllCountries().then((data) => {
        setAllCountries(data);
        setCountries(data);
      });
    }
  }, [navigate]);

  const handleSearch = (term) => {
    if (!term) {
      setCountries(allCountries);
    } else {
      searchCountryByName(term)
        .then(setCountries)
        .catch(() => setCountries([]));
    }
  };

  const handleFilter = (region) => {
    if (!region) {
      setCountries(allCountries);
    } else {
      getCountriesByRegion(region).then(setCountries);
    }
  };

  const handleToggleFavorites = () => {
    if (!showFavorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteCountries = allCountries.filter((country) =>
        favorites.includes(country.cca3)
      );
      setCountries(favoriteCountries);
    } else {
      setCountries(allCountries);
    }
    setShowFavorites(!showFavorites);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 p-6 relative">
      <div className="max-w-7xl mx-auto">





        {/* Control Panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <SearchBar onSearch={handleSearch} />
          <FilterDropdown onSelect={handleFilter} />
          <button
            onClick={handleToggleFavorites}
            className={`flex items-center gap-2 px-6 py-0.25 rounded-lg font-semibold margin-top-10px shadow-md transition-all duration-300
            ${showFavorites
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
          >
            <FaHeart className="text-xl" />
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {countries.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">No countries found.</p>
          ) : (
            countries.map((country) => (
              <div
                key={country.cca3}
                className="transition-transform transform hover:-translate-y-2"
              >
                <CountryCard country={country} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
