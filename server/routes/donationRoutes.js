const express = require('express');
const router = express.Router();
const { createDonation ,
    deleteDonation,
    getAllDonations,
    getDonationsByCampaign,
    getDonation,
    getDonationsByUser,
    createDonationPaypal
} = require('../controllers/donationController');

router.post('/', createDonation);
router.post('/paypal/', createDonationPaypal);
router.delete("/:id",deleteDonation );
router.get("/", getAllDonations);
router.get("/campaign/:id", getDonationsByCampaign);
router.get("/users/:id", getDonationsByUser);
router.get("/:id", getDonation);
module.exports = router;
