import { Job } from "../models/job.models.js";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"


const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        // return res.status(200).json(jobs);
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { jobs: jobs },
        });
        // res.send(jobs);
    } catch (error) {
        return next(error)
    }
};


const getJobById = async (req, res, next) => {

    try {

        const { id } = req.params;


        const jobbyid = await Job.findById(id);
        // return res.status(200).json(companiebyid);
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { jobs: jobbyid },
        });
        //res.send(jobbyid);
    } catch (error) {
        return next(error)
    }
};

const createJob = async (req, res, next) => {

    const { body } = req;

    try {

        const newJob = new Companies({
            name: body.name,
            id_company: body.id_company,
            name_company: body.name_company,
            candidate_list: body.candidate_list,
            salary: body.salary,
            description: body, description,
            location: body.location,
            requiremets: body, requiremets
        });

        const savedJob = await newJob.save();

        return res.json({
            status: 201,
            message: 'Job Registered successfully',
            data: savedJob
        });
    } catch (error) {
        return next(error);

    }
};

// const findJobByName = async (req, res, next) => {
//     const { name } = req.params;
//     console.log(name);
//     try {
//         const companieByName = await Companies.find({ name: name });
//         return res.json({
//             // status: 200,
//             // message: httpStatusCode[200],
//             data: { companie: companieByName }
//         })
//     } catch (error) {
//         next(error)
//     }
// };

// const editNamejob = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const NameJob = new Companies(req.body);
//         //Para evitar que se modifique el id de mongo:
//         Companies._id = id;
//         const NameJobUpdate = await Companies.findByIdAndUpdate(
//             id,
//             NameJob
//         );
//         return res.json({
//             status: 200,
//             message: httpStatusCode[200],
//             data: { namejob: NameJobUpdate },
//         });
//     } catch (error) {
//         return next(error);
//     }
// };


export { getAllJobs, getJobById, createJob};