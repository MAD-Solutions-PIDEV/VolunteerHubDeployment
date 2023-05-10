const express = require("express");
const router = express.Router();
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
  UpdateCampaign,
  deleteCampaign,
  getAllCampaigns,
  newCampaign,
  findById,
  acceptCampaign,
  refuseCampaign,
  getCampaignNameById,
  organizationByUser,
  getCampaignCauseById
} = require("../controllers/campaignController");


/* GET home page. */
router.get("/", getAllCampaigns);
router.get('/:id',findById);
router.post("/",upload.single("image"), newCampaign);
router.put("/:id", UpdateCampaign);
router.delete("/:id", deleteCampaign);
router.put("/accept/:id",acceptCampaign);
router.put("/refuse/:id",refuseCampaign);
router.get("/campaignName/:id",getCampaignNameById);
router.get("/campaignCause/:id",getCampaignCauseById);
router.get("/organization/:userId", organizationByUser);
module.exports = router;