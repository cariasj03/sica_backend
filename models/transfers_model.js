const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
  transferId: {
    type: String,
    required: true,
  },
  assetId: {
    type: String,
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  originUnit: {
    type: String,
    required: true,
  },
  targetUnit: {
    type: String,
    required: true,
  },
  targetLocation: {
    type: String,
    required: true,
  },
  targetLocationCode: {
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
  transferImage1: {
    type: String,
    required: true,
  },
  transferImage2: {
    type: String,
    required: true,
  },
  requestedBy: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    required: true,
  },
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
