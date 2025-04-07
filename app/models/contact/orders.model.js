const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersDataSchema = new Schema({
  title: { type: String },
  adminId: { type: String },
  adminName: { type: String },
  products: { type: JSON },
  status: { type: String, default: "false" },
  statusSignImage: { type: String, default: "-" },
  statusOp: { type: String, default: "false" },
  statusOpUser: { type: String, default: "-" },
  statusOpUserSignImage: { type: String, default: "-" },
  statusOpAdmin: { type: String, default: "false" },
  statusOpUserAdmin: { type: String, default: "-" },
  statusOpUserAdminSignImage: { type: String, default: "-" },
  creatorName: { type: String },
  buyerName: { type: String },
  buyerCode: { type: String },
  nationalCode: { type: String },
  address: { type: String },
  postalCode: { type: String },
  phone: { type: String },
  buissCode: { type: String },
  tax: { type: String },
  des: { type: String },
  code: { type: String },
  month: { type: String },
  year: { type: String },
  createDate: { type: String, default: new Date().toLocaleDateString("fa-IR") },
});

const OrdersModel = mongoose.model("OrdersDataSchema", OrdersDataSchema);
module.exports = { OrdersModel };
