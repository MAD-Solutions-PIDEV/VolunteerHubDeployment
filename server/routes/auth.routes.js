const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");
const rateLimit = require("express-rate-limit");

module.exports = function (app) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 attempts per login
    message:
      "Sorry!, too many wrong attempts, please try again in {time_left} minutes",
    handler: function (req, res, next) {
      const timeLeft = Math.trunc(
        Math.ceil(req.rateLimit.resetTime - Date.now()) / 1000 / 60
      );
      res.status(429).json({
        message: `Sorry!, too many wrong attempts, please try again in ${timeLeft} minutes`,
      });
    },
  });

  // Affect
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", limiter, controller.signin);

  app.post("/api/auth/signout", controller.signout);
  // Password reset request route
  app.post("/auth/password-reset-request", controller.passwordResetRequest);

  // Email verification
  app.post("/api/verifyuser/:activationCode", controller.verifyUser);

  // Log Activities
  app.post("/api/auth/log", controller.logActivity);

  app.get("/api/role/:name", controller.findRoleByName);
};
