const express = require("express");
const router = express.Router();

const {
  getUsers,
  validateUser,
  blockUser,
  deleteUser

} = require("../controllers/adminController");

const {
  authenticateToken

} = require("../middlewares/authentificationMiddlewares");

/* GET home page. */
router.get("/", getUsers);
router.put("/validate/:id", validateUser);
router.put("/block/:id",  blockUser);
router.put("/delete/:id", deleteUser);
module.exports = router;