import expres from "express";
import { getAllEmployers, getAllEmployersById, getEmployersByDni , createEmployer } from "../controllers/employers.controllers.js";


const employersRoutes = expres.Router();

employersRoutes.get("/", getAllEmployers);
employersRoutes.get("/:id", getAllEmployersById);
employersRoutes.post("/", createEmployer);
employersRoutes.get("/dni/:dni", getEmployersByDni);


export { employersRoutes }
