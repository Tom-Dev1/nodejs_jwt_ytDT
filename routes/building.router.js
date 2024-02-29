const express = require('express');
const router = express.Router();
const BuildingController = require('../controllers/building.controller');
const middlewareController = require('../middlewares/middlewaresController');

// Tạo mới tòa nhà
router.post('/newBuilding', middlewareController.verifyToken, BuildingController.createBuilding);

// Lấy thông tin của một tòa nhà cụ thể
router.get('/:id', BuildingController.getBuildingById);

// Lấy danh sách tất cả tòa nhà
router.get('/', BuildingController.getBuildings);

// Cập nhật thông tin của một tòa nhà
router.put('/:id', middlewareController.verifyToken, BuildingController.updateBuilding);

// Xóa một tòa nhà
router.delete('/:id', middlewareController.verifyToken, BuildingController.deleteBuilding);

module.exports = router;
