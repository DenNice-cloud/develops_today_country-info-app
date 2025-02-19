export interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface PopulationCounts {
  year: number;
  value: number;
}

export interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCounts[];
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Borders[];
}

export interface Borders {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
}

export interface CountryResponse {
  name: string;
  countryCode: string;
}