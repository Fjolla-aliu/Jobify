const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Employee = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  birthYear: {
    type: String,
  },
  departmentId: {
    type: String,
  },
});

module.exports = mongoose.model("Employee", Employee);
