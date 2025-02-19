import { Link } from "react-router-dom";
import { CountryFlag, CountryInfo, CountryPopulation } from "../types/type";
import { useEffect, useState } from "react";
import axios from "axios";

interface CountryInfoExistProps {
  countryInfo: CountryInfo;
  code: string;
}

export const CountryInfoExist = ({
  countryInfo,
  code,
}: CountryInfoExistProps) => {
  const [countryPopulation, setCountryPopulation] =
    useState<CountryPopulation>();
  const [countryFlag, setCountryFlag] = useState<CountryFlag>();

  const API_POPULATION = "http://localhost:3000/population";
  const API_FLAG = "http://localhost:3000/flag";

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const responsePopulation = await axios.post(API_POPULATION, { code });
        const responseFlag = await axios.post(API_FLAG, { code });

        setCountryPopulation(responsePopulation.data);
        setCountryFlag(responseFlag.data);
      } catch (error) {
        console.error("Error fetching country info", error);
      }
    };

    fetchCountryInfo();
  }, [code]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        {countryInfo.officialName}
      </h1>

      <div className="flex flex-col items-center">
        {countryFlag && (
          <img
            src={countryFlag.flag}
            alt={`${countryFlag.name} Flag`}
            className="w-32 h-20 mb-4 border"
          />
        )}

        <p className="text-lg">
          <strong>Country code:</strong> {countryInfo.countryCode}
        </p>

        <p className="text-lg">
          <strong>Region:</strong> {countryInfo.region}
        </p>

        {countryPopulation && countryPopulation.populationCounts.length > 0 && (
          <p className="text-lg ">
            <strong className="flex justify-center">Population: </strong>

            {countryPopulation?.populationCounts.map((population) => (
              <div
                key={population.year}
                className="flex gap-4"
              >
                <strong>Year: </strong>
                {population.year}
                <strong>People: </strong>
                {population.value.toLocaleString()}
              </div>
            ))}
          </p>
        )}
      </div>

      {countryInfo.borders.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-center mt-6">Borders:</h2>

          <div className="flex flex-wrap justify-center gap-6 max-w-[800px] mx-auto mt-4">
            {countryInfo.borders.map((border) => (
              <div
                key={border.countryCode}
                className="w-[calc(20%-8px)] min-w-[120px] border p-4 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center"
              >
                <Link
                  to={`/country/${border.countryCode}`}
                  className="block text-xl font-semibold text-blue-600 hover:underline"
                >
                  {border.officialName}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
