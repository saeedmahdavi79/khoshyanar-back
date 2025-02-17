const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HavaleAzAnbarSchema = new Schema({
  products: { type: JSON },
  adminId: { type: String },
  adminName: { type: String },
  signers: { type: JSON },
  status: { type: String, default: "false" },
  code: { type: String },
  reciver: { type: String },
  exitRes: { type: String },
  client: { type: String },
  representative: { type: String },
  carNumber: { type: String },
  date: { type: String },
  location: { type: String },
  source: { type: String },
  sourceName: { type: String },
  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const HavaleAzAnbarModel = mongoose.model(
  "HavaleAzAnbarSchema",
  HavaleAzAnbarSchema
);

module.exports = { HavaleAzAnbarModel };
