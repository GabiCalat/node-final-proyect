import express from "express";
import dotenv from "dotenv";
import {connect} from "./server/config/database.js"
import cors from "cors";


import {router as employersRoutes} from "./server/api/routes/employers.routes.js"
dotenv.config();

const server= express();
connect();

const PORT=process.env.PORT;
server.use(cors("*"))

server.use(express.json());
server.use(express.urlencoded({extended:true}))

//server.use(logger("dev"));


server.use("/employers",employersRoutes)

server.listen(PORT,()=>{
    console.log(`Node server listening on port http:${PORT}`)
})