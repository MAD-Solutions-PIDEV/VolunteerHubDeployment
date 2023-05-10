const express = require("express");
const router = express.Router();
const emojisController = require("../controllers/captcha.controller");

router.get("/generate", (req, res) => {
  const emojis = emojisController.generateEmojis();
  res.json({ emojis });
});

module.exports = router;
