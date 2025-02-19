const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  requesterName: { type: String },
  date: { type: String },
  startDate: { type: String },
  length: { type: String },
  des: { type: String },
  adminUser: { type: String },
  requesterId: { type: String },
  type: { type: String },

  status: { type: String, default: "false" },
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
const LeaveModel = mongoose.model("LeaveSchema", LeaveSchema);

module.exports = { LeaveModel };
