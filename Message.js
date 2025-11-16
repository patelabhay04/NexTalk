import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },   // username
  receiver: { type: String, default: null },  // username for private messages
  group: { type: String, default: null },     // group id or name
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Message", messageSchema);
