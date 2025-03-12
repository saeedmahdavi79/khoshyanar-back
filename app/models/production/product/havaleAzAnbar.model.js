const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HavaleAzAnbarSchema = new Schema({
  products: { type: JSON },
  adminId: { type: String },
  adminName: { type: String },
  signers: { type: JSON },
  status: { type: String, default: "false" },
  statusSignImage: { type: String, default: "-" },
  statusOp: { type: String, default: "false" },
  statusOpUser: { type: String, default: "-" },
  statusOpUserSignImage: { type: String, default: "-" },
  statusOpAdmin: { type: String, default: "false" },
  statusOpUserAdmin: { type: String, default: "-" },
  statusOpUserAdminSignImage: { type: String, default: "-" },
  statusOpAdminAnbardar: { type: String, default: "false" },
  statusOpUserAdminAnbardar: { type: String, default: "-" },
  statusOpUserAdminSignImageAnbardar: { type: String, default: "-" },
  code: { type: String },
  reciver: { type: String },
  reciverCode: { type: String },
  reciver2: { type: String },
  reciverCode2: { type: String },
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
