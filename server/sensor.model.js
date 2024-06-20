const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Sensor = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },

  deviceId: {
    type: String,
  },
});

module.exports = mongoose.model("Sensor", Sensor);
