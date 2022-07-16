import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    job: { type: String, required: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }