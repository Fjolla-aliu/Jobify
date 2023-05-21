const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Job = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  companyName: {
    type: String,
  },
  category: {
    type: String,
  },
  hours: {
    type: String,
  },
  remote: {
    type: Boolean,
  },
  untilDate: {
    type: String,
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model("Job", Job);
