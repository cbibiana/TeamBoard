import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  //para relacionar con otra tabla type:Schema.ObjectId busca en la tabla de mongodb
  role: { type: mongoose.Schema.ObjectId, ref: "roles" },
  task: { type: mongoose.Schema.ObjectId, ref: "tasks" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const user = mongoose.model("users", userSchema);
export default user;