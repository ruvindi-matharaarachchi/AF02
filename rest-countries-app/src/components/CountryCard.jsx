import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function CountryCard({ country }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(country.cca3));
  }, [country.cca3]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((code) => code !== country.cca3);
    } else {
      favorites.push(country.cca3);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="group block transition-transform transform hover:scale-105"
    >
      <div className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition p-5 text-center">
        <button
          onClick={toggleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 text-xl transition-colors hover:scale-110 ${
            isFavorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          <FaStar />
        </button>

        <img
          src={country.flags.svg}
          alt={country.name?.common || "Flag"}
          className="w-32 h-20 mx-auto object-contain mb-3 rounded-md transition duration-300 group-hover:scale-110"
        />
        <h2 className="text-lg font-semibold text-gray-800">{country.name.common}</h2>
        <div className="text-sm text-gray-600 mt-1">
          <p>Capital: {country.capital?.[0] || "N/A"}</p>
          <p>Region: {country.region}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
