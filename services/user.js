const userController = require('../controllers/userController');
const middlewareController = require('../middlewares/middlewaresController');
const router = require('express').Router();

//GET ALL USERS
router.get('/', middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete('/:id', middlewareController.verifyTokenAndAdmin, userController.deleteUser); //router.delete('/:id', userController.)

module.exports = router;
