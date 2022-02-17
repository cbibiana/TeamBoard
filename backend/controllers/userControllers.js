import user from "../models/user.js";
import bcrypt from "bcrypt"; //encripta contraseña
import jwt from "jsonwebtoken"; // cuando se registra el usuario queda encriptada en un token de registro
import moment from "moment";


// se crea la funcion para registrar usuario
const registerUser = async (req, res) => {
  // valido que los datos de usuarios no me lleguen vacios
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  // para encriptar la contraseña
  const passHash = await bcrypt.hash(req.body.password, 10);

  // funcion  copia del model para poder registrar
  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  //confirmar a mongodb
  const result = await userSchema.save();

  if (!result) res.status(500).send({ message: "failed to register user" });

  // generar un json webtoken, porq mongodb no me puede mostrar el usuario y contraseña del usuario
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          //codigo iat
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Resgister error" });
  }
};

// en el metodo find me trae lo de la base de datos .populate("role").exec() me trae lo que esta en role , los objeteID
const listUser = async (req, res) => {
  let users = await user.find().populate("role").exec();
  // si quiero agregar un filtro , lo debo ingresar adentro

  //si el tamaño de item de este arreglo es 0 esta vacio
  if (users.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ users });
};

export default { registerUser, listUser };
