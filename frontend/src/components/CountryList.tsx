import { useEffect, useState } from "react";
import axios from "axios";
import { CountryResponse } from "../types/type";
import { CountryShortInfo } from "./CountryShortInfo";

const CountryList = () => {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const API_URL = import.meta.env.VITE_MAIN_API;

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
            <CountryShortInfo country={country} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
