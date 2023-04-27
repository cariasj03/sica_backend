const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // unitOrigin: {
  //   type: String,
  //   required: true,
  // },
  unitDestination: {
    type: String,
    required: true,
  },
  locationDestination: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // pictureOne: {
  //   type: String,
  //   required: true,
  // },
  // pictureTwo: {
  //   type: String,
  //   required: true,
  // },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
