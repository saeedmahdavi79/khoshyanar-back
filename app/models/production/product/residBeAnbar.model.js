const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResidBeAnbarSchema = new Schema({
  products: { type: JSON },
  adminId: { type: String },
  adminName: { type: String },
  signers: { type: JSON },
  status: { type: String, default: "false" },
  code: { type: String },
  reciver: { type: String },
  date: { type: String },
  location: { type: String },
  source: { type: String },
  sourceName: { type: String },
  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const ResidBeAnbarModel = mongoose.model(
  "ResidBeAnbarSchema",
  ResidBeAnbarSchema
);

module.exports = { ResidBeAnbarModel };
