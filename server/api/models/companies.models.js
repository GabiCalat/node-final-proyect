import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompaniesSchema = new Schema(

    {

        name_job: { type: String, required: true },
        companie: { type: String, required: true },
        cif: { type: String, required: true },

        email: { type: String, required: true },
        logo: { type: String, required: false },
       
    });

const Companies = mongoose.model("companies", CompaniesSchema);

export { Companies };