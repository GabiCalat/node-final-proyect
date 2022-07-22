import expres from "express";
import { createCompany, getAllCompanies, getCompanyById, findCompanieByName, editNamejob } from "../controllers/companies.controllers.js";


const companiesRoutes = expres.Router();

companiesRoutes.get("/", getAllCompanies);
companiesRoutes.get("/:id", getCompanyById);
companiesRoutes.post("/", createCompany);
companiesRoutes.get("/name/:name", findCompanieByName);
companiesRoutes.put("/modify/:id", editNamejob);

export { companiesRoutes }