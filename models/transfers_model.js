const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  transferId: {
    type: String,
    required: true,
  },
  transferName: {
    type: String,
    required: true,
  },
  transferUnitOrigin: {
    type: String,
    required: true,
  },
  transferUnitDestination: {
    type: String,
    required: true,
  },
  transferLocationDestination: {
    type: String,
    required: true,
  },
  transferLocationDestinationCode: {
    type: String,
    required: true,
  },
  transferReason: {
    type: String,
    required: true,
  },
  transferDescription: {
    type: String,
    required: true,
  },
  // transferPictureOne: {
  //   type: String,
  //   required: true,
  // },
  // transferPictureTwo: {
  //   type: String,
  //   required: true,
  // },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
