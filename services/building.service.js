// building.service.js
const Building = require('../models/building.model');

const getBuildings = async () => {
  return await Building.find({}).populate('areaId');
};

const getBuildingById = async (id) => {
  return await Building.findById(id).populate('areaId');
};

const createBuilding = async (data) => {
  const newBuilding = new Building(data);
  return await newBuilding.save();
};

const updateBuilding = async (id, data) => {
  return await Building.findByIdAndUpdate(id, data, { new: true });
};

const deleteBuilding = async (id) => {
  return await Building.findByIdAndRemove(id);
};

module.exports = {
  getBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
