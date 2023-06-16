const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Apply = new Schema({
  id: {
    type: String,
  },
  user: {
    type: Object,
  },
  job: {
    type: Object,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Apply", Apply);
