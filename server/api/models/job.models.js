import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        id_companie: { type: String, required: true },
        name_companie: { type: String, required: true },
        candidate_list: { type: String, required: true },
        salary: { type: String, required: true },
        age: { type: Number, required: true },
        dni: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Employers = mongoose.model("employers", Employerschema);

export { Employers };
