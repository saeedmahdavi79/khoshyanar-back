const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
  leadName: { type: String },
  leadSubject: { type: String },
  visitorName: { type: String },
  visitorId: { type: String },
  adminUser: { type: String },
  adminUserName: { type: String },

  leadCompany: { type: String },
  leadCompanyId: { type: String },
  leadPosition: { type: String },
  leadEmail: { type: String },
  staticPhone: { type: String },
  phone: { type: String },
  leadWebsite: { type: String },
  leadAddress: { type: String },
  leadType: { type: String },
  leadSource: { type: String },
  leadLevel: { type: String },
  leadStatus: { type: String },
  leadCompanyCount: { type: String },

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
const LeadModel = mongoose.model("LeadSchema", LeadSchema);

module.exports = { LeadModel };
