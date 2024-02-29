const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const authController = {
  //Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user in DataBase
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      //Save to Database
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      'secretkey',
      { expiresIn: '1h' }
    );
  },
  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      'refreshkey',
      { expiresIn: '1h' }
    );
  },
  //LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username }); //Find user by username
      if (!user) {
        res.status(404).json('User not found');
      }
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.status(404).json('Wrong password');
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        //Save to cookies
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          path: '/',
          secure: false,
          sameSite: 'strict',
        });
        const { password, ...others } = user._doc; // Reponse without password
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;

    // Send the new access token in the response
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(401).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, 'refreshkey', (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'strict',
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.status(200).json('User is logged out');
  },
};
module.exports = authController;
