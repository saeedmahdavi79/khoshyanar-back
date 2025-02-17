const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
  sourceName: { type: String },
  sourceDes: { type: String },
  id: { type: String },

  firstCount: { type: String },
  entryCount: { type: String },
  exportCount: { type: String },
  vahed: { type: String },
  type: { type: String },
  dama: { type: String },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },
  expireDate: { type: String },
  adminUser: { type: String },
  adminUserName: { type: String },

  yearFinancial: { type: String },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const SourceModel = mongoose.model("SourceSchema", SourceSchema);

module.exports = { SourceModel };
