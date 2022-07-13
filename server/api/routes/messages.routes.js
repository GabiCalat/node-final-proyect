import expres from "express";

import { addMsg, getAllMsg } from "../controllers/messages.controllers.js";


const messagesRoutes = expres.Router();

messagesRoutes.post("/sendMessage", addMsg );
messagesRoutes.post("/getMessages", getAllMsg);

export { messagesRoutes }
