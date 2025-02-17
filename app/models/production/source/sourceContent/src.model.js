const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SrcContentSchema = new Schema({
  sourceCode: { type: String },
  productId: { type: String },
  sourceName: { type: String },
  sourceDes: { type: String },
  firstCount: { type: String },
  entryCount: { type: String },
  exportCount: { type: String },
  mainCount: { type: String },
  sourceId: { type: String },
  adminId: { type: String },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  day: {
    type: String,
  },
  yearFinancial: { type: String },
  createDate: {
    type: String,
    default: new Date(),
  },
});
const SrcContentModel = mongoose.model("SrcContentSchema", SrcContentSchema);

module.exports = { SrcContentModel };
