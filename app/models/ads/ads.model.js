const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdsSchema = new Schema({
  addLocation: { type: String },
  addName: { type: String },
  city: { type: String },
  lat: { type: String },
  lon: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  postalCode: { type: String },
  des: { type: String },
  view: { type: String },
  cat: { type: String },
  userId: { type: String },
  mainPicture: { type: String },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const AdsModel = mongoose.model("AdsSchema", AdsSchema);

module.exports = { AdsModel };
