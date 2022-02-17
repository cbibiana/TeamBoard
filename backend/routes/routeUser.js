import express from "express";
import userControllers from "../controllers/userControllers.js";
import userMidd from "../middleware/userValidate.js";
import roleMidd from "../middleware/roleValidate.js";

// creo una variable , para encargarse o manejar las peticiones del post, get y delete
const router = express.Router();

//http://localhost:3001/api/user/registerUser
//en post para registrar
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userControllers.registerUser
);

router.get("/listUser", userControllers.listUser)

export default router;
