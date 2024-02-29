const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  areaId: { type: Schema.Types.ObjectId, ref: 'Area', required: true },
  name: { type: String, required: true },
  status: { type: Boolean },
  dateTime: { type: Date },
});

const Building = mongoose.model('Building', BuildingSchema);

module.exports = Building;
