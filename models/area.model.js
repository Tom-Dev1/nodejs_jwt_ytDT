const mongoose = require('mongoose');

// Define Area Schema
const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  status: { type: Boolean },
  dateTime: { type: Date },
});
const Area = mongoose.model('Area', AreaSchema);

module.exports = Area;
