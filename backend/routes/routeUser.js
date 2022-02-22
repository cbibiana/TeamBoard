import express from "express";
import userControllers from "../controllers/userControllers.js";
import userMidd from "../middleware/userValidate.js";
import roleMidd from "../middleware/roleValidate.js";
// import taskValidate from "../middleware/taskValidate.js";
import roleControllers from "../controllers/roleControllers.js";
// import taskControllers from "../controllers/taskControllers.js";

// creo una variable , para encargarse o manejar las peticiones del post, get y delete
const router = express.Router();

//http://localhost:3001/api/user/registerUser
//en post para registrar
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userControllers.registerUser,
  roleControllers.registerRole,
);

//ruta login siempre va hacer un post
router.post("/login", userControllers.login);

///:name indica que se le va a gragar un parametro
router.get("/listUser/:name?", userControllers.listUser);
router.get("/listUserAdmin/:name?", userControllers.listUserAdmin);


//router.delete inactiva un usuario
router.put("/delete/:_id", userControllers.deleteUser);

//router para cambiar datos, no lleva parametros :_id 
router.put("/updateUserAdmin/", userControllers.updateUserAdmin);

export default router;
