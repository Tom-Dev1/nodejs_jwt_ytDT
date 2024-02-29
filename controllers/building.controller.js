const buildingService = require('../services/building.service');

const getBuildings = async (req, res) => {
  const buildings = await buildingService.getBuildings();
  res.json(buildings);
};

const getBuildingById = async (req, res) => {
  const building = await buildingService.getBuildingById(req.params.id);
  res.json(building);
};

const createBuilding = async (req, res) => {
  const newBuilding = await buildingService.createBuilding(req.body);
  res.json(newBuilding);
};

const updateBuilding = async (req, res) => {
  const updatedBuilding = await buildingService.updateBuilding(req.params.id, req.body);
  res.json(updatedBuilding);
};

const deleteBuilding = async (req, res) => {
  await buildingService.deleteBuilding(req.params.id);
  res.json({ message: 'Building deleted' });
};

module.exports = {
  getBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
