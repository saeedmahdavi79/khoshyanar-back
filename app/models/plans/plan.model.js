const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlansSchema = new Schema({
  planName: { type: String },
  planDetails: { type: String },
  planPrice: { type: String },
  planStatus: { type: String },
  planDiscount: { type: String },
  planLenght: { type: String },
  planProfit: { type: String },
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
const PlansModel = mongoose.model("PlansSchema", PlansSchema);

module.exports = { PlansModel };
