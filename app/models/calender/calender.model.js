const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalenderSchema = new Schema({
  color: { type: String },
  end: { type: String },
  start: { type: String },
  title: { type: String },
  adminUser: { type: String },
  visitorUser: { type: String },
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
const CalenderModel = mongoose.model("CalenderSchema", CalenderSchema);

module.exports = { CalenderModel };
