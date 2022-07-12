import { Employers } from "../models/employers.models.js"
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"

//get all employers
const getAllEmployers = async (req, res, next) => {
    try {
        const employers = await Employers.find();
        return res.status(200).json(employers);
        return res.json({
          //  status : 200,
          //  message : httpStatusCode[200],
           data : { employers: employers },
        });
        res.send(employers);
    } catch (error) {
        return next(error)
    }
};


//employers only by id
const getAllEmployersById = async (req, res, next) => {

    try {

        const { id } = req.params;
        console.log(id);

        const employerbyid = await Employers.findById(id);
        return res.status(200).json(employerbyid);
            return res.json({
              //  status : 200,
              //  message : httpStatusCode[200],
               data : { employers: employerbyid },
            });
            res.send(employerbyid);
        } catch (error) {
            return next(error)
        }
};

const getEmployersByDni = async(req,res,next) => {
    const {dni} = req.params;
    //console.log(name);
    try {
      const employerByDni = await Employers.find({dni: dni});
      return res.json({
        // status: 200,
        // message: httpStatusCode[200],
        data: {employer: employerByDni}
      })
    } catch (error) {
      next(error)
    }
}


const createEmployer = async (req, res, next) => {

    const { body } = req;

    try {

        const newEmployer = new Employers({
            name: body.name,
            surname: body.surname,
            email: body.email,
            job: body.job,
            age: body.age,
            dni: body.dni,
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
};

export { getAllEmployers, getAllEmployersById, createEmployer, getEmployersByDni };