import 'dotenv/config';

import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;

const connection = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Connected with db: ${name}, in host: ${host}`);
    } catch (error) {
        console.log("Error to connect with BD", error);
    }
};

export { DB_URL, connection }

/* import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB=process.env.DB_URL;

const connect = async () => {
    try {
        const DB = await mongoose.connect(MONGODB, {
            userNewUrlParser: true,
            userUnifiedTopology: true,
        });

        const { name, host } = DB.connection;
        console.log(`Connected to databse ${name} in host: ${host}`)

    } catch (error) {
        console.log("Error connecting to databse", error);
    }

};

export { connect } */