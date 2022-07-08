import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB=process.env.MONGODB;

const connect= async()=>{
try{
    const DB=await mongoose.connect(MONGODB,{
        userNewUrlParser:true,
        userUnifiedTopology:true,
    });

    const {name,host}=DB.connection;
    console.log(`Connected to databse ${name} in host: ${host}`)

} catch(error){
    console.log("Error connecting to databse",error);
}

};

export {connect}