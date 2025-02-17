const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  name: { type: String },
  coName: { type: String },
  text: { type: String },
  date: { type: String },
  type: { type: String },
  contractName: { type: String },
  contractStep: { type: String },
  contractPrice: { type: String },
  phone: { type: String },

  adminUserName: { type: String },
  adminUser: { type: String },
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
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const ContractModel = mongoose.model("ContractSchema", ContractSchema);

module.exports = { ContractModel };
