const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Department = new Schema({
  departmentId: {
    type: String,
  },
  name: {
    type: String,
  },
  number: {
    type: String,
  },
});

module.exports = mongoose.model("Department", Department);
