const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifSchema = new Schema({
  nameElan: { type: String },
  contentElan: { type: String },
  status: { type: String, default: "false" },
  adminUser: { type: String },
  adminUserName: { type: String },

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
const NotifModel = mongoose.model("NotifSchema", NotifSchema);

module.exports = { NotifModel };
