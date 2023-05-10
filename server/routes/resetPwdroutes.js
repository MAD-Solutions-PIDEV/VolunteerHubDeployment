const express = require("express");

const { resetPassword } = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/reset/:token", resetPassword);

module.exports = router;
