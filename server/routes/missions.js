const express = require('express');
const Mission = require("../models/mission");
const path = require("path");

const { getMission,getMissionByCategory, addMission, updateMission, deleteMission,getMissionById,
acceptMission,refuseMission, sendMail,getMissionBySkills} = require("../controllers/missionControllers");

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

router.get('/', getMission);
router.get('/category/:category',getMissionByCategory);
router.post('/', upload.single("Image"),addMission);
router.put('/:id',updateMission);
router.delete('/:id', deleteMission);
router.get('/:id', getMissionById);


router.put("/accept/:id",acceptMission);
router.put("/refuse/:id",refuseMission);
router.post('/api/sendmail', sendMail);
router.get('/search/skill', async (req, res) => {
  const skills = req.query.skills;
  try {
    const missions = await getMissionBySkills(skills);
    res.status(200).json(missions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const filteredMissions = await filterMissions(user.skills);
    res.status(200).json(filteredMissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); 
// Route for sending a validation code by SMS
router.post('/sendNotificationMission', (req, res) => {

  client.messages.create({
    to: req.body.phone,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Congratulations, ${req.body.username}! Your mission ${req.body.Title} has been accepted! `
  }).then(() => {
    res.json({success: true});
    
  }).catch((error) => {
    console.log(error);
    res.json({success: false, error: error.message});
  });
});

module.exports = router;


