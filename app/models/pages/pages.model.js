const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PagesSchema = new Schema({
  pageRole: { type: String },
  pageTitle: { type: String },
  pageDes: { type: String },
  pageType: { type: String },
  pageName: { type: String },
  pageAddress: { type: String },
  pageCanonical: { type: String },
  pageOpenGrapgh: {
    type: Object,
    default: {
      url: "",
      title: "",
      description: "",
      siteName: "",
    },
  },
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
const PagesModel = mongoose.model("PagesSchema", PagesSchema);

module.exports = { PagesModel };
