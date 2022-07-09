import express from "express";
import dotenv from "dotenv";
import { connection } from "./server/config/database.js"
import cors from "cors";
import { employersRoutes } from "./server/api/routes/employers.routes.js";


// import {router as employersRoutes} from "./server/api/routes/employers.routes.js"
dotenv.config();

const server = express();
connection();

const PORT = process.env.PORT;

//CORS
server.use(cors("*"))

//Midlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }))


//ROUTES
server.use("/employers", employersRoutes)

server.listen(PORT, () => {
    console.log(`Node server listening on port http:${PORT}`)
})