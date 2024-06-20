const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Movie = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  releaseYear: {
    type: String,
    },
    directorId: {
      type:String
  },
  
});

module.exports = mongoose.model("Movie", Movie);
