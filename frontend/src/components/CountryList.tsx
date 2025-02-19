import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CountryResponse } from "../types/type";



const CountryList = () => {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const API_URL = "http://localhost:3000/";

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URL);

        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Countries List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {countries.map((country) => (
          <div
            key={country.countryCode}
            className="border p-4 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center"
          >
            <Link
              to={`/country/${country.countryCode}`}
              className="block text-xl font-semibold text-blue-600 hover:underline "
            >
              {country.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
