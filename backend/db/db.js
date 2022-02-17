//libreria que se encarga de todo lo de la base de datos de mongodb
import mongoose from "mongoose";

//funcion para concetar la base de datos
// try catch para manejar errores que no conocemos, la utilizamos para conectarnos a mongos y nos podemos encontrar con algun error q ni idea sabemos. mongoose.connect(process.env.DB_CONNECTION) LLamamos es mongoose y la funcion conect y con el porcess entramos a las variables de entorno que estan en el .ENV. Con el PROCESS entramos a todos los archivos punto y algo jejejej.
//useNewUrlParser:true, es para utilizar una nueva url para darle nuevo formato a la url de conexion para optimizar
//useUnifiedTopology:true,es para darnos mas informacion concreta, tipo de escritura mas entendible
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (error) {
    console.log("Error Connecting to MongoDB: \n ", error);
  }
};

// se exporta la funcion para que otro archivo lo utiliza
export default { dbConnection };
