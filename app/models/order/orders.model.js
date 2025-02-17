const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const OrdersSchema = new Schema({
  orderNum: { type: String, default: getRandomInteger(1000000, 9999999) },
  orderPrice: { type: String },
  orderPayMethod: { type: String },
  orderDes: { type: String },
  orderUser: { type: String },
  orderStatus: { type: String },
  trackId: { type: String },
  orderPDR: { type: String },

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
const OrderModel = mongoose.model("OrdersSchema", OrdersSchema);

module.exports = { OrderModel };
