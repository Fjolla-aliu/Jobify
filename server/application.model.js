const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Application = new Schema({
  id: {
    type: String,
  },
  date: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  applicantId: {
    type: String,
  },
});

module.exports = mongoose.model("Application", Application);
