const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  visitorName: { type: String },
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  role: { type: String },
  nationalId: { type: String, required: true },
  userProfileImage: { type: String },
  personelId: { type: String },
  address: { type: String },
  position: { type: String },
  company: { type: String },
  departemant: { type: String },
  adminUser: { type: String },
  visitorCompany: { type: String },
  description: { type: String },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },
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
const VisitorModel = mongoose.model("VisitorSchema", VisitorSchema);

module.exports = { VisitorModel };
