import { Companies } from "../models/companies.models.js"
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"

    
    const getAllCompanies = async (req, res, next) => {
        try {
            const companies = await Companies.find();
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: companies,

            });

        } catch (error) {

            return next(error);
        }
    };


    const getAllCompaniesById = async (req, res, next) => {

        try {
    
            const { id } = req.params;
            console.log(id);
    
            const companiebyid = await Companies.findById(id);
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { conpanies: companiebyid }
            });
    
        } catch (error) {
    
            return next(error);
        }
    };

    const createCompanie = async (req, res, next) => {

        const { body } = req;
    
        try {
    
            const newCompanie = new Companies({
                name_job: body.name_job,
                companie: body.companie,
                email: body.email,
                cif: body.cif,
                logo: body.logo,
            });
    
            const savedCompanie = await newCompanie.save();
    
            return res.json({
                status: 201,
                message: 'Companie Registered successfully',
                data: savedCompanie
            });
        } catch (error) {
            return next(error);
    
        }       
    };

    const findCompanieByName = async(req,res,next) => {
        const {name} = req.params;
        console.log(name);
        try {
          const companieByName = await Companies.find({name: name});
          return res.json({
            // status: 200,
            // message: httpStatusCode[200],
            data: {companie: companieByName}
          })
        } catch (error) {
          next(error)
        }
    };

    const editNamejob = async (req, res, next) => {
        try {
          const { id } = req.params;
          const NameJob = new Companies(req.body);
          //Para evitar que se modifique el id de mongo:
          Companies._id = id;
          const NameJobUpdate = await Companies.findByIdAndUpdate(
            id,
            NameJob
          );
          return res.json({
            status: 200,
            message: httpStatusCode[200],
            data: { namejob: NameJobUpdate },
          });
        } catch (error) {
          return next(error);
        }
    };


export { getAllCompanies, getAllCompaniesById, createCompanie, findCompanieByName, editNamejob };