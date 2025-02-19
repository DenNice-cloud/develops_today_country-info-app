import { Router } from "express";
import { countryController } from "../controller/country.controller";

const countryRouter = Router();

countryRouter.get("/", countryController.getCountry);
countryRouter.post("/info", countryController.getCountryInfo);
countryRouter.post("/population", countryController.getCountryPopulation);
countryRouter.post("/flag", countryController.getCountryInfoFlag);

export default countryRouter;
