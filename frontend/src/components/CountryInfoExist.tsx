import { CountryFlag, CountryInfo, CountryPopulation } from "../types/type";
import { useEffect, useState } from "react";
import axios from "axios";
import { PopulationDetail } from "./PopulationDetail";
import { CountryShortInfo } from "./CountryShortInfo";

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
  const [loading, setLoading] = useState(true);

  const API_POPULATION = import.meta.env.VITE_API_POPULATION;
  const API_FLAG = import.meta.env.VITE_API_FLAG;

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const responsePopulation = await axios.post(API_POPULATION, { code });
        const responseFlag = await axios.post(API_FLAG, { code });

        setLoading(true);
        setCountryPopulation(responsePopulation.data);
        setCountryFlag(responseFlag.data);
      } catch (error) {
        console.error("Error fetching country info", error);
      }
      
      setLoading(false);
    };

    fetchCountryInfo();
  }, [code]);

  return (
    <>
      {loading ? (
        <h1 className="flex justify-center text-3xl font-bold">Loading...</h1>
      ) : (
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

            {countryPopulation &&
              countryPopulation.populationCounts.length > 0 && (
                <span className="text-lg">
                  <strong className="flex justify-center">Population: </strong>

                  {countryPopulation?.populationCounts.map((population) => (
                    <div
                      key={population.year}
                      className="flex gap-4"
                    >
                      <PopulationDetail population={population} />
                    </div>
                  ))}
                </span>
              )}
          </div>

          {countryInfo.borders.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-center mt-6">
                Borders:
              </h2>

              <div className="flex flex-wrap justify-center gap-6 max-w-[800px] mx-auto mt-4">
                {countryInfo.borders.map((border) => (
                  <div
                    key={border.countryCode}
                    className="border p-4 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center"
                  >
                    <CountryShortInfo country={border} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
