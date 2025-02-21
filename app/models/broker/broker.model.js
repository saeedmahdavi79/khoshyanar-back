const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrokerSchema = new Schema({
  products: { type: JSON },
  title: { type: String },
  adminId: { type: String },
  adminName: { type: String },
  status: { type: String },
  statusSignImage: { type: String },
  month: { type: String },
  year: { type: String },
  code: { type: String },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const BrokerModel = mongoose.model("BrokerSchema", BrokerSchema);

module.exports = { BrokerModel };
