const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");

router.get("/country/:country", addressController.getAddressesByCountry);
router.get("/state/:state", addressController.getAddressesByState);
router.get("/all", addressController.getAddresses);
router.get("/:id", addressController.getAddressById);

module.exports = router;
