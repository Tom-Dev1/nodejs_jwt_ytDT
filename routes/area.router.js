const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/area.controller');
const middlewareController = require('../middlewares/middlewaresController');

// Tạo mới khu vực
router.post('/newAreas', middlewareController.verifyToken, AreaController.createArea);

// Lấy thông tin của một khu vực cụ thể
router.get('/:id', AreaController.getAreaById);

// Lấy danh sách tất cả các khu vực
router.get('/', AreaController.getAreas);

// Cập nhật thông tin của một khu vực
router.put('/:id', AreaController.updateArea);

// Xóa một khu vực
router.delete('/:id', middlewareController.verifyToken, AreaController.deleteArea);

module.exports = router;
