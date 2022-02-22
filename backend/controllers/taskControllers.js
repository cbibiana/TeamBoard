import task from "../models/task.js";

//funciön para registrar la tarea
const registerTask = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.imageUrl)
    return res.status(400).send({ message: "Incomplete data" });

  const taskShema = new task({
    name: req.body.name,
    description: req.body.description,
    imageUrl: "",
    taskStatus: "to-do",
  });

  //confirmar a mongo

  const result = await taskShema.save();
  if (!result) res.status(500).send({ message: "Failed to register task" });
  res.status(200).send({result})
};

//Listar tareas

const listTask = async (req,res) => {
    let tasks = await task.find();

    if (tasks.length === 0)
    return res.status(400).send({message:"No serch results"});

    return res.status(200).send({tasks});

};

//Eliminar tarea
const deleteTask = async (req, res) => {
    if(!req.params["_id"])
    return res.status(400).send({message: "Incomplete data"});
  
    const tasks = await task.findByIdAndDelete(req.params["_id"]);
  
  return !tasks
   ? res.status(400).send({message: "Error deleting task"})
   : res.status(200).send({message: "Task deleted"});
  
  };

  //Cambiar de estado
  const changeStatus = async(req, res) => {
if (!req.params["_id"])
return res.status(400).send({message:"Incomplete dats"});

const tasks = await task.findByIdAndUpdate(req.params["_id"], {
    taskStatus: "in-progress",
    taskStatus:"finish",
});

return !tasks
? res.status(400).send({message:"Error changing status"})
: res.status(200).send({message:"Change of status"});
  };


//Actualizar cualquier campo de la tabla de task
  const updateTask = async (req, res)=> {
if(!req.body.name || !req.body.description || !req.body.imageUrl || !req.body.taskStatus) return res.status(400).send({message:"Incplete data"});

// se actualiza los nuevos datos en la bd
  const editTask = await task.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    imageUrl: "",
    taskStatus: "to-do",  
  });

  if (!editTask) return res.status(500).send({message:"Error editing task"});
  return res.status(200).send({message:"Task update"});
};

export default { registerTask, listTask, deleteTask, changeStatus, updateTask };
