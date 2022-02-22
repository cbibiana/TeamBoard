import task from "../models/task.js";

const existingTask = async (req, res, next) => {

    const taskId = await task.findOne({message:"user"});
    if (!taskId) return res.status(500).send({message:"No task was assigned"});

    req.body.task = taskId._id;
    next();
};



export default (existingTask)