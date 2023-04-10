const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  canton: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
