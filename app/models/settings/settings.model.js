const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  sellerName: { type: String },
  bussinessNumber: { type: String },
  sabtNmuber: { type: String },
  nationalCode: { type: String },
  postalCode: { type: String },
  fax: { type: String },
  address: { type: String },
  phone: { type: String },
  logoImage: { type: String },
  wordpressApi: { type: String },
  wordpressConsumer: { type: String },
  wordpressSecret: { type: String },
  sepidarApi: { type: String },
  sepidarToken: { type: String },
  farazSmsApi: { type: String },
  farazSmsPattern: { type: String },
  farazSmsUser: { type: String },
  farazSmsPass: { type: String },
  adminUser: { type: String },
  createDateTask: { type: String, default: new Date().getTime() },
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
const SettingModel = mongoose.model("SettingSchema", SettingSchema);

module.exports = { SettingModel };
