const jwt = require('jsonwebtoken');

const middlewareController = {
  // verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer <access_token>
      const accessToken = token.split(' ')[1];
      jwt.verify(accessToken, 'secretkey', (err, user) => {
        if (err) {
          return res.status(403).json('Token is not valid');
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json('You are not allowed to do that!');
      }
    });
  },
};
module.exports = middlewareController;
//AUTHENTICATION
//   authenticateToken: (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, 'secretkey', (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   },
//   //AUTHORIZATION
//   isAdmin: (req, res, next) => {
//     if (!req.user.admin) return res.sendStatus(403);
//     next();
//   },
//
