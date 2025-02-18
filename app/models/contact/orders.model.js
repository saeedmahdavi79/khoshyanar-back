const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersDataSchema = new Schema({
  title: { type: String },
  adminId: { type: String },
  adminName: { type: String },
  products: { type: JSON },
  status: { type: String, default: "false" },
  statusOp: { type: String, default: "false" },
  statusOpUser: { type: String, default: "-" },
  creatorName: { type: String },

  code: { type: String },
  month: { type: String },
  year: { type: String },
  createDate: { type: String, default: new Date().toLocaleDateString("fa-IR") },
});

const OrdersModel = mongoose.model("OrdersDataSchema", OrdersDataSchema);
module.exports = { OrdersModel };
