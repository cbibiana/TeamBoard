//encargado de tener toda la estructura

import express from "express";
import roleControllers from "../controllers/roleControllers.js";

// creo una variable , para encargarse o manejar las peticiones del post, get y delete
const router = express.Router();

//http://localhost:3001/api/role/registerRole
//en post para registrar
router.post("/registerRole", roleControllers.registerRole);

export default router;
