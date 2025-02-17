const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
  subject: { type: String },
  zonkan: { type: String },
  recivers: { type: Array },
  doc: { type: String },
  number: { type: String },
  content: { type: String },
  status: { type: String, default: "false" },
  adminUser: { type: String },
  adminUserName: { type: String },
  day: { type: String },
  month: { type: String },
  year: { type: String },
  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const LetterModel = mongoose.model("LetterSchema", LetterSchema);

module.exports = { LetterModel };
