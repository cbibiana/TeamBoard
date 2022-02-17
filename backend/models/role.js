import mongoose from "mongoose";

// en la variable rolschema es igual a un nuevo esquema de la base de datos.
//aqui creamos la tabla de rol en la base de datos mongodb
const rolSchema = new mongoose.Schema({
  name: String,
  description: String,
  //guarda la fecha actual del sistema del momento en el que se registro
  registerDate: { type: Date, default: Date.now },
  //para desactivar un registro y no eliminar
  dbStatus: Boolean,
});


//creo esta variable role para exportar la coleccion de los registros de rolSchema en todo el proyecto donde la invoquen y  en roles guardo todo el roleShema en la tabla mongodb.
const role = mongoose.model("roles" , rolSchema);

export default role;