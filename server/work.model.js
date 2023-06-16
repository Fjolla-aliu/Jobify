const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Work = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  technologies: {
    type: String,
  },
  experience: {
    type: String,
  },
  userName: {
    type: String,
  },
  category: {
    type: String,
  },
  degree: {
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
module.exports = mongoose.model("Work", Work);