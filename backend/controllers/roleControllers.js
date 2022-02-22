import role from "../models/role.js";

//funcion para registrar un usuario en la bd
//req (requis) lo q se pidio puede ser url y res (responsive)la respuesta como apicación
//async convierte la funcion en asincrona
const registerRole = async(req, res) => {
  //req.body tiene por dentro la descripcion del json
  //se valida si llego todos los datos y si no muestra el mensaje
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Imcomplete data" }); //respuesta que vamos a entrar  400 mensaje de error, send es enviar

  //si llegan todos los datos del roleShema
  //creo una variable schema para crear el json  va a quedar el roleShema de role
  //creo una instancia con los mismos datos de la tabla schemaRole
  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  //este es para guardar esa informacion en la bd
  //await ayuda esperar a q mongo traiga el resultado
  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "failed to register role" });

  res.status(200).send({ result });

}; 

const listRole = async (req, res) => {
  let roles = await role.find();
  // si quiero agregar un filtro , lo debo ingresar adentro

  //si el tamaño de item de este arreglo es 0 esta vacio
  if (roles.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ roles });
};

export default { registerRole, listRole };
