const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
  contactName: { type: String },
  contactCompany: { type: String },
  contactCompanyId: { type: String },
  contactPosition: { type: String },
  staticPhone: { type: String },
  phone: { type: String },
  fax: { type: String },
  email: { type: String },
  visitorUser: { type: String },
  visitorId: { type: String },
  address: { type: String },
  nationalCode: { type: String },
  birthDate: { type: String },
  marriedDate: { type: String },
  leadName: { type: String },
  leadId: { type: String },
  userImageProfile: { type: String },
  adminId: { type: String },
  description: { type: String },

  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },

  joinDate: { type: String, default: new Date().toLocaleDateString("fa-ir") },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const ContactsModel = mongoose.model("ContactsSchema", ContactsSchema);

module.exports = { ContactsModel };
