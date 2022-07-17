import expres from "express";
import { createCompanie, getAllCompanies, getCompanyById, findCompanieByName, editNamejob } from "../controllers/companies.controllers.js";


const companiesRoutes = expres.Router();

companiesRoutes.get("/", getAllCompanies);
companiesRoutes.get("/:id", getCompanyById);
companiesRoutes.post("/", createCompanie);
companiesRoutes.get("/name/:name", findCompanieByName);
companiesRoutes.put("/modify/:id", editNamejob);

// employersRoutes.post("/", createEmployer);


export { companiesRoutes }