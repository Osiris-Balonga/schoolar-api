const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const NotificationSchema = new mongoose.Schema({
  notifObject: String,
  notifMessage: String,
  notifDatetime: String,
  author: String,
  isSeen: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("notification", NotificationSchema);
