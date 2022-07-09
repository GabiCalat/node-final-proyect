import { Employer } from "../models/employers.models.js"
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"

//get all employers
const getAllEmployers = async (req, res, next) => {
    try {
        const employers = await Employer.find();
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: employers,

        });

    } catch (error) {

        return next(error);
    }
};


//employers only by id
const getAllEmployersById = async (req, res, next) => {

    try {

        const { id } = req.params;
        console.log(id);

        const employerbyid = await Employer.findById(id);
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { employers: employerbyid }
        });

    } catch (error) {

        return next(error);
    }
};

/**
 * POST
 * Create employer
 * 
 * 
 */
const createEmployer = async (req, res, next) => {

    const { body } = req;

    try {

        const newEmployer = new Employer({
            name: body.name,
            surname: body.surname,
            email: body.email,
            job: body.job,
            age: body.age,
            number: body.number,
        });

        const savedEmployer = await newEmployer.save();

        return res.json({
            status: 201,
            message: 'Registered successfully',
            data: savedEmployer
        });
    } catch (error) {
        return next(error);

    }

    /*     try {
    
            const newEmployer = new Employer(req.body);
    
            const newEmployerDB = await newEmployer.save();
            return res.json({
                status: 201,
                message: httpStatusCode[201],
                data: { employer: newEmployerDB },
            });
        } catch (error) {
            return next(error);
        } */
};

export { getAllEmployers, getAllEmployersById, createEmployer };