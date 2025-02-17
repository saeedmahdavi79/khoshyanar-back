const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SMSSchema = new Schema({
  title: { type: String },
  message: { type: String },
  numbers: { type: Array },
  adminUser: { type: String },
  adminUserName: { type: String },
  administrator: { type: String, required: true },
  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const SmsModel = mongoose.model("SMSSchema", SMSSchema);

module.exports = { SmsModel };
