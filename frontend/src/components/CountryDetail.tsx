import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CountryInfoExist } from "./CountryInfoExist";
import { CountryInfo } from "../types/type";

const CountryDetail = () => {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const API_INFO = "http://localhost:3000/info";

  useEffect(() => {
    setCountryInfo(null);

    const fetchCountryInfo = async () => {
      setLoading(true);

      try {
        const responseInfo = await axios.post(API_INFO, { code });

        setCountryInfo(responseInfo.data);
      } catch (error) {
        console.error("Error fetching country info", error);
      }

      setLoading(false);
    };

    fetchCountryInfo();
  }, [code]);

  return (
    <div className="p-4">
      {loading ? (
        <h1 className="flex justify-center text-3xl font-bold">Loading...</h1>
      ) : (
        <>
          <Link
            to={`/`}
            className="inline-block border p-2 rounded-lg border-black
            transition-all duration-300 
            text-xl font-semibold text-blue-600
            hover:shadow-xl"
          >
            Back to Main List
          </Link>

          {countryInfo && code && (
            <CountryInfoExist
              countryInfo={countryInfo}
              code={code}
            />
          )}

          {!countryInfo && (
            <h1 className="text-3xl font-bold text-center mb-6">
              Error fetching country data
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default CountryDetail;
