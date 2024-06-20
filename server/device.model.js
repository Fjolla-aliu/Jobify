const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Device = new Schema({
  deviceId: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("Device", Device);
