import role from "../models/role.js";

const existingRole = async (req, res, next) => {

    
  //asignarle un rol
const roleId = await role.findOne({ name: "user" });
  if (!roleId) return res.status(500).send({ message: "No role was assigned" });


  // como agregar datos a un objeto en javascritp
    //req.body ---> rol: rolId._id
  req.body.role = roleId._id;
 next();
};

export default {existingRole};