import { Request, Response } from "express";
import axios from "axios";
import { getFlag } from "../services/country.service";

const API_AVAILABLE = process.env.AVAILABLE_COUNTRIES || "";
const API_COUNTRY_INFO = process.env.COUNTRY_INFO || "";
const API_COUNTRY_POPULATION = process.env.COUNTRY_POPULATION || "";

interface PopulationCount {
  year: number;
  value: number;
}

interface CountryData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: CountryData[];
}

export const countryController = {
  getCountry: async (req: Request, res: Response) => {
    try {
      const response = await axios.get(API_AVAILABLE);

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  },
  getCountryInfo: async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
      if (!code) {
        throw new Error("Don`t get the code");
      }

      const response = await axios.get(`${API_COUNTRY_INFO}/${code}`);

      res.json(response.data);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching country info",
        error: (error as Error).message,
      });
    }
  },
  getCountryPopulation: async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
      if (!code) {
        throw new Error("Don`t get the code");
      }

      const countryData = await getFlag(code);

      const response: any = await axios.get(API_COUNTRY_POPULATION);

      const countryResult = response.data.data.find((arg: CountryData) => arg.iso3 === countryData.iso3);

      res.json(countryResult);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching country info",
        error: (error as Error).message,
      });
    }
  },
  getCountryInfoFlag: async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
      if (!code) {
        throw new Error("Don`t get the code");
      }

      const countryData = await getFlag(code);

      res.json(countryData);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching country info",
        error: (error as Error).message,
      });
    }
  },
};
