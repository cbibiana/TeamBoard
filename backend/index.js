//libreria para crear el servidor
import express from "express";
//normas seguridad de archivos
import cors from "cors";
//libreria para conectarnos a la base de datos
import db from "./db/db.js";
import routeRole from "../backend/routes/routeRole.js";
import routeUser from "../backend/routes/routeUser.js";
import routeTask from "../backend/routes/routeTask.js";
//importar libreria de variables de entorno
import dotenv from "dotenv";
//habilitar el dontend para que cualquier otro archivo lo puede utilizar
dotenv.config();

//app es mi servidor y puede utilizar todo lo de express
const app = express();
// poner reglas al servidor
//solo va a usar formato json
app.use(express.json());
//todo lo de cors lo voy a utilizar
app.use(cors());

app.use("/api/role", routeRole);
app.use("/api/user", routeUser);
app.use("/api/task", routeTask);
//app.listen comunicacion de node y mongo le hace la reservacion de puerto al sistema operativo windows
// process.env.PORT EL servidor me trae el puerto en el que va a trabajar y nos muestra un mensaje por consola y nos dice en que puerto esta trabajando o si esta ocupado le dice que el puerto esta ocupado
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: ", process.env.PORT)
);

// traer el modulo db y traer la funcion dbConnection
db.dbConnection();
