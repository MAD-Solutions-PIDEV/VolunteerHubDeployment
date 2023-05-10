const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Store the JWT token in the session
    req.session.token = req.user.token;
    const data = {
      user: req.user,
      token: req.user.token,
    };
    const encodedData = encodeURIComponent(JSON.stringify(data));
    res.redirect(`/auth?data=${encodedData}`);
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

module.exports = router;
