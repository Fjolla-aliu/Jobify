const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});
module.exports = mongoose.model("User", User);
