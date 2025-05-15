import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../api/countries";
import { FaArrowLeft } from "react-icons/fa";

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code).then((res) => setCountry(res[0]));
  }, [code]);

  if (!country)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading country details...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:underline hover:text-blue-800 mb-6"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        {/* Flag */}
        <div className="mb-6 shadow-lg rounded-lg overflow-hidden border">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-60 object-cover"
          />
        </div>

        {/* Details */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {country.name.common}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Subregion:</span>{" "}
            {country.subregion || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            {Object.values(country.languages || {}).join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Timezones:</span>{" "}
            {country.timezones?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
