const router = require('express').Router();

const authController = require('../controllers/authController');
const middlewareController = require('../middlewares/middlewaresController');

//Register
router.post('/register', authController.registerUser);
//LOGIN
router.post('/login', authController.loginUser);

//Refresh
router.post('/refresh', authController.requestRefreshToken);
//LOGOUT
router.post('/logout', middlewareController.verifyToken, authController.userLogout);

module.exports = router;
