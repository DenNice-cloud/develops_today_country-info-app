import { Link } from "react-router-dom";
import { Borders, CountryResponse } from "../types/type";

interface CountryResponseProps {
  country: CountryResponse | Borders;
}

export const CountryShortInfo: React.FC<CountryResponseProps> = ({
  country,
}) => {
  return (
    <>
      <Link
        to={`/country/${country.countryCode}`}
        className="block text-xl font-semibold text-blue-600 hover:underline "
      >
        {"name" in country ? country.name : country.officialName}
      </Link>
    </>
  );
};
