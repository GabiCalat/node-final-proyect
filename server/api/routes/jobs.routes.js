import expres from "express";
import { getAllJobs,getJobById,createJob, addUserToJob, deleteUserToJob} from "../controllers/job.controllers.js";

const jobRoutes = expres.Router();

jobRoutes.get("/", getAllJobs);
jobRoutes.get("/:id", getJobById);
jobRoutes.post("/", createJob);
jobRoutes.put("/add-user", addUserToJob);
jobRoutes.put("/delete-user-job", deleteUserToJob);
// jobRoutes.get("/name/:name", findjobByName);
// jobRoutes.put("/modify/:id", editNamejob);

// employersRoutes.post("/", createEmployer);


export { jobRoutes }