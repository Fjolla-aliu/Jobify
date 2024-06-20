const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Director = new Schema({
  directorId: {
    type: String,
  },
  name: {
    type: String,
  },
  birthYear: {
    type: String,
    },
  
  
});

module.exports = mongoose.model("Director", Director);
