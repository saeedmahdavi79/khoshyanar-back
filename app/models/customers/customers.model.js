const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
  name: { type: String },
  perName: { type: String },
  financialCode: { type: String },
  conName: { type: String },
  conDes: { type: String },
  birthDate: { type: String },
  nationalCode: { type: String },
  state: { type: String },
  city: { type: String },
  address: { type: String },
  postalCode: { type: String },
  workType: { type: String },
  relationType: { type: String },
  countOfPersonel: { type: String },
  ownerShip: { type: String },
  connection: { type: String },
  type: { type: String },
  coType: { type: String },
  sabtNumber: { type: String },
  buissCode: { type: String },
  lon: { type: String },
  lat: { type: String },
  userName: { type: String },
  password: { type: String },
  hesabMande: { type: String },
  phone: { type: String },
  des: { type: String },
  id: { type: String },

  adminUser: { type: String },
  adminUserName: { type: String },

  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },

  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const CustomersModel = mongoose.model("CustomersSchema", CustomersSchema);

module.exports = { CustomersModel };
