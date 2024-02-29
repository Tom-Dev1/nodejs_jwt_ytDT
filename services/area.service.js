const Area = require('../models/area.model');

const getAreas = async () => {
  return await Area.find({});
};

const getAreaById = async (id) => {
  return await Area.findById(id);
};

const createArea = async (data) => {
  const newArea = new Area(data);
  return await newArea.save();
};

const updateArea = async (id, data) => {
  return await Area.findByIdAndUpdate(id, data, { new: true });
};

const deleteArea = async (id) => {
  return await Area.findByIdAndRemove(id);
};

module.exports = {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
