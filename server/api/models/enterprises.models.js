import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompaniesSchema = new Schema({

    name: { type: String, required: true },
    cif: { type: String, required: true },
    city: { type: String, required: true },
    job: { type: String, required: true },
    age: { type: Number, required: true },

});

const Companies = mongoose.model("companies", CompaniesSchema);

export { Companies };