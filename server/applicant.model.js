const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Applicant = new Schema({
  applicantId: {
    type: String,
  },
  name: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Applicant", Applicant);
