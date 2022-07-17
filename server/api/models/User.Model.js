import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    password:{type:String,required:true},
    education: { type: String},
    age: { type: Number, required: false },
    description:{type:String,required:false},
    habilities:{type:String},
    image: { type: String, required: false },// prueba
    jobs:{type: mongoose.Types.ObjectId, ref: 'companies', required: false },
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }