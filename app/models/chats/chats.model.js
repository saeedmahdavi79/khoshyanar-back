const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chatName: { type: String },
  chatUserId: { type: String },
  chatUserName: { type: String },
  secondPerson: { type: String },
  secondPersonName: { type: String },
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
const ChatModel = mongoose.model("ChatSchema", ChatSchema);

module.exports = { ChatModel };
