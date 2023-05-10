const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const filename = uuidv4() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });
const {
  getUser,
  updateUser,
  getById,
  getHost,
  updateHost,
  getRoleById,
  addFavoriteHost,
  removeFavoriteHost,
} = require("../controllers/userControllers");

const { users, validate } = require("../models/user");
const router = express.Router();

/* GET home page. */
router.get("/", upload.single("image"),getUser);
router.get("/host", getHost);
router.put("/:id", upload.single("image"),updateUser);
router.get("/:id", upload.single("image"), getById);
router.put("/host/:id", upload.single("image"),updateHost);
router.get("/role/:id",getRoleById)
router.post("/favoriteHost/:id", addFavoriteHost);
router.post('/removefavoritehost/:id', removeFavoriteHost);


module.exports = router;
