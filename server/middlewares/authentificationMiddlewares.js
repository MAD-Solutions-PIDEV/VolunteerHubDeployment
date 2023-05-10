// Middleware to authenticate token
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    console.log(authHeader);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  
  function checkPermissions(role, permissions) {
    return function(req, res, next) {
      if (req.user.role === role && req.user.permissions.includes(permissions)) {
        next();
      } else {
        res.status(403).json({ message: 'You do not have permission to access this resource' });
      }
    };
  } 




  module.exports={authenticateToken,checkPermissions}