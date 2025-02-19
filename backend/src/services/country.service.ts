import axios from "axios";

interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

const API_COUNTRY_FLAG = process.env.COUNTRY_FLAG || "";

export const getFlag = async ( code: string ) => {
  const response: any = await axios.get(API_COUNTRY_FLAG);
  
  const countryData = response.data.data.find(
    (flags: CountryFlag) => flags.iso2 === code
  );

  return countryData;
};
