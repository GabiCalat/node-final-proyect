import express from "express";
import 'dotenv/config';

import { connection } from "./server/config/database.js"
import cors from "cors";
import { employersRoutes } from "./server/api/routes/employers.routes.js";
import { companiesRoutes } from "./server/api/routes/companies.routes.js";
import { userRoutes } from "./server/api/routes/user.routes.js";

connection();

const PORT = process.env.PORT;
const router = express.Router();
const server = express();

server.set("secretKey", "nodeRestApi"); 

//headers setups
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//Midlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//CORS
server.use(cors("*"));

//ROUTES
// router.get('/', (req, res) => {
//     res.send('Hola de nuevo desde mongo')
// });

//server.use('/', router);
server.use("/employers", employersRoutes);
server.use("/companies", companiesRoutes);
server.use("/users", userRoutes);

//ERROR CONTROL
server.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

//SERVER LISTEN
server.listen(PORT, () => {
    console.log(`Node server listening on port http:${PORT}`)
})