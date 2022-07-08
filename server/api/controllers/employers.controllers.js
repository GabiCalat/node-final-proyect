import {Employer} from "../models/employers.models.js"
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"

const getAllEmployers=async(req,res,next)=>{
    try {
        const employers=await Employer.find();
        return res.json({
            status:200,
            message:httpStatusCode[200],
            data:employers,

        });
        
    } catch (error) {
        
        return next(error);
    }
};

const getAllEmployersById=async(req,res,next)=>{

    try{

        const {id}=req.params;
        console.log(id);

        const employerbyid=await Employer.findById(id);
        return res.json({
            status:200,
            message:httpStatusCode[200],
            data:{employers:employerbyid}
        });

    } catch(error){

        return next(error);
    }
};

const createEmployer=async(req,res,next)=>{
    try {
        
        const newEmployer=new Employer(req.body);
    
    const newEmployerDB= await newEmployer.save();
    return res.json({
        status:201,
        message:httpStatusCode[201],
        data: {employer:newEmployerDB},
    });
    } catch(error){
        return next(error);
    
    }
    };

    export {getAllEmployers,getAllEmployersById,createEmployer};