import express from "express";
import taskControllers from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/registerTask", taskControllers.registerTask);
router.get("/listTask", taskControllers.listTask );
router.delete("/deleteTask/:_id", taskControllers.deleteTask)
router.put("/changeStatus/:_id", taskControllers.changeStatus);
router.put("/updateTask/",taskControllers.updateTask);

export default router;