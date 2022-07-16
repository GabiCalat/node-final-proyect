import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        name: { type: String, required: true },
        id_company: { type: mongoose.Types.ObjectId, ref: 'Companies', required: true },
        // name_company: { type: mongoose.Types.ObjectId,ref: 'User', required: true },
        candidate_list: [{ type: mongoose.Types.ObjectId, ref: 'User', required: false }],
        salary: { type: Number, required: true },
        description: { type: String, required: true },
        location: { type: String, required: false },
        requiremets: { type: String, required: true },
        //age: { type: Number,},

    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Jobs", JobSchema);

export { Job };
