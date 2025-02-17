const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TasksOtherSchema = new Schema({
  taskTitle: { type: String },
  taskDate: { type: String },
  taskDes: { type: String },
  taskStatus: { type: String },
  taskId: { type: String },
  adminUser: { type: String },
  personelUser: { type: String },
  personelUserName: { type: String },
  expiresIn: { type: String },
  targetDate: { type: String },
  createDateTask: { type: String, default: new Date().getTime() },
  createDate: {
    type: String,
    default:
      new Date().toLocaleDateString("fa-ir") +
      "-" +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
  },
});
const TasksOtherModel = mongoose.model("TasksOtherSchema", TasksOtherSchema);

module.exports = { TasksOtherModel };
