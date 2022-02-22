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
    task: req.body.task,
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
          task: result.task,
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

//{name:new RegExp(req.params["name"])} esto es para crear nuestra propia expresion regular
const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  // si quiero agregar un filtro , lo debo ingresar adentro

  //si el tamaño de item de este arreglo es 0 esta vacio
  if (users.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ users });
};

//listar con filtros en metodo find para que solo me busque los usuarios que estan en true
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();
  // si quiero agregar un filtro , lo debo ingresar adentro

  //si el tamaño de item de este arreglo es 0 esta vacio
  if (users.length === 0)
    return res.status(400).send({ message: "No serch results" });

  return res.status(200).send({ users });
};
//para crear el login del usuario para hacer validaciones
const login = async (req, res) => {
  // esta funcion valida si se es encuentra
  const userLogin = await user.findOne({ email: req.body.email });
  //si no hay nada
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  //si no esta en la base de datos , cuando la base de datos es true
  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Wrong email or password" });

  //el usuario ingresa el pasword y nosotros lo encriptamos entonces toca hacer algo para que lo acepte
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  // enviar el json webtoken
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          //codigo iat
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

//funcion para editar un campo de  cualquiera de un usuario de la base de datos(desactiva al usuario)
const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  //aqui me busca este id y me actualiza el dbStatus
  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

//actualizar editando cualquier campo del usuario pero queda activo
const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  //variable passw para guardar el pasword nuevo o el que me trajo el findUser
  let passw = "";
  //si esto llego vacio !req.body.password vamos hacer una busqueda y traer el pasword del usuario
  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    passw = findUser.password;
  } else {
    passw = await bcrypt.hash(req.body.password, 10);
  }

  //se actualiza los nuevos datos en la bd
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: passw,
    role: req.body.role,
  });

  if (!editUser) return res.status(500).send({ message: "Error editing user" });
  return res.status(200).send({ message: "User update" });
};

export default {
  registerUser,
  listUser,
  listUserAdmin,
  login,
  deleteUser,
  updateUserAdmin,
};
