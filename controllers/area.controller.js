// area.controller.j
const areaService = require('../services/area.service');

const getAreas = async (req, res) => {
  const areas = await areaService.getAreas();
  res.json(areas);
};

const getAreaById = async (req, res) => {
  const area = await areaService.getAreaById(req.params.id);
  res.json(area);
};

const createArea = async (req, res) => {
  const newArea = await areaService.createArea(req.body);
  res.json(newArea);
};

const updateArea = async (req, res) => {
  const updatedArea = await areaService.updateArea(req.params.id, req.body);
  res.json(updatedArea);
};

const deleteArea = async (req, res) => {
  await areaService.deleteArea(req.params.id);
  res.json({ message: 'Area deleted' });
};

module.exports = {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
};
