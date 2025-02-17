const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },

  createDate: {
    type: String,
    default: new Date().toLocaleDateString("fa-ir"),
  },
});
const ChatModel = mongoose.model("ChatSchema", ChatSchema);

module.exports = { ChatModel };
