const passport = require("passport");
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Store the JWT token in the session
    const token = req.user.token;
    console.log("Token generated:", token);
    const data = {
      user: req.user,
      token: token,
    };
    const encodedData = encodeURIComponent(JSON.stringify(data));

    res.redirect(`http://localhost:3000/auth?data=${encodedData}`);
  }
);

const requireAuth = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    res.redirect("/login");
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  }
};

router.get("/", requireAuth, (req, res) => {
  const data = {
    user: req.user,
    token: req.user.token,
  };

  const encodedData = encodeURIComponent(JSON.stringify(data));

  res.redirect(`http://localhost:3000/auth?data=${encodedData}`);
});

router.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.redirect("http://localhost:3000/login");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = router;
