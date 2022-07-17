import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    education: { type: String },
    age: { type: Number },
    description: { type: String },
    habilities: { type: String },
    image: { type: String },
    contacts: [{ type: mongoose.Types.ObjectId, ref: 'User', required: false }],
    applied_jobs: [{ type: mongoose.Types.ObjectId, ref: 'Companies', required: false }],

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export { User }