import expres from "express";
import { isAuth } from "../../authentication/jwt.js";
import { getAllJobs,getJobById,createJob, addUserToJob, deleteUserFromJob} from "../controllers/job.controllers.js";

const jobRoutes = expres.Router();

jobRoutes.get("/", getAllJobs);
jobRoutes.get("/:id", getJobById);
jobRoutes.post("/", createJob);
jobRoutes.put("/add-user", [isAuth], addUserToJob);
jobRoutes.put("/delete-user-job", [isAuth], deleteUserFromJob);
// jobRoutes.get("/name/:name", findjobByName);
// jobRoutes.put("/modify/:id", editNamejob);

// employersRoutes.post("/", createEmployer);


export { jobRoutes }