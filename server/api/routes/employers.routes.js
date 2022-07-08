import expres from "express";
import {getAllEmployers,getAllEmployersById,createEmployer} from "../controllers/employers.controllers.js";


const router= expres.Router();

router.get("/", getAllEmployers);
router.get("/:id",getAllEmployersById)
router.post("/create",createEmployer);


export {router}
