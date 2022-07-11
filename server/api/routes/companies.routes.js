import expres from "express";
import { createCompanie, getAllCompanies, getAllCompaniesById, findCompanieByName, editNamejob } from "../controllers/companies.controllers.js";


const companiesRoutes = expres.Router();

companiesRoutes.get("/", getAllCompanies);
companiesRoutes.get("/:id", getAllCompaniesById);
companiesRoutes.post("/", createCompanie);
companiesRoutes.get("/name/:name", findCompanieByName);
companiesRoutes.put("/modify/:id", editNamejob);

// employersRoutes.post("/", createEmployer);


export { companiesRoutes }