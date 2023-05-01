const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
  id: {
    type: String,
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
  unit: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  approvedBy: {
    type: String,
    required: false,
  },
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
