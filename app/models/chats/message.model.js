const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function getCurrentTime() {
    const now = new Date(); 
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    const seconds = String(now.getSeconds()).padStart(2, '0'); 

    return `${hours}:${minutes}:${seconds}`; 
}

const MessageSchema = new Schema({
  messageDate: { type: String , default: new Date().toLocaleDateString("fa-ir") + "-" + getCurrentTime() },
  messageType: { type: String },
  messageContent: { type: String },
  messageUpload: { type: String },
  messageUserType: { type: String },

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
const MessageModel = mongoose.model("MessageSchema", MessageSchema);

module.exports = { MessageModel };
