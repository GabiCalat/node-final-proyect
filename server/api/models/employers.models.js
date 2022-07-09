import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Employerschema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        job: { type: String, required: true },
        age: { type: Number, required: true },
        number: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const Employer = mongoose.model("employer", Employerschema);

export { Employer };
