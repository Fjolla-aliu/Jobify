const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Interview = new Schema({
  id: {
    type: String,
  },
  user: {
    type: Object,
  },
  worker: {
    type: Object,
  },
  importantThings: {
    type: String,
  },
  interviewDate: {
    type: String,
  },
});
module.exports = mongoose.model("Interview", Interview);
