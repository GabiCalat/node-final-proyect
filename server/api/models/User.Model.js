import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String, required:true},
    education: { type: String, required:true},
    age: { type: Number, required: false },
    description:{type:String, required:false},
    habilities:{type:String, required:false},
    image: { type: String, required: false },// prueba
    jobs:{type: mongoose.Types.ObjectId, ref: 'companies', required: false },
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }