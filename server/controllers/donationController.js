const Donation = require('../models/donation');
const stripe = require('stripe')('sk_test_51MuaySCoH0bMJevV2l6tpBmSYrrQKhZbSjOF0LzQenL7TSMS4yTcMHoBYr82g43nmxFVxHnpPWM9DuIXZBjbevpQ00atALFSnk');
const { incrementAmount} = require("../controllers/campaignController");
const createDonationPaypal = async (req, res) => {
  try {
   
    const donation = new Donation(req.body);
    console.log(donation);
     
    await donation.save();
    res.status(201).json(donation);
    incrementAmount(donation.campaign.id,donation.amount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new donation
const createDonation = async (req, res) => {
  try {
   
    const donation = new Donation(req.body);
    console.log(donation);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: donation.amount,
      currency: 'usd',
      description: 'Donation',
      statement_descriptor: 'Charity Donation',
      metadata: {
        donor_name: donation.donor.username,
        campaign: donation.campaign.title,
      },
      receipt_email: donation.donor.email,
    });
    if(paymentIntent){
    donation.paymentIntentId = paymentIntent.id;
    await donation.save();}
    res.status(201).json(donation);
    incrementAmount(donation.campaign.id,donation.amount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donation 
const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    res.json(donation);
  } catch (error) {
    res.status(404).json({ message: 'Donation not found' });
  }
};



// Delete a donation 
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all donations for a given campaign
const getDonationsByCampaign = async (req, res) => {
    try {
      const campaignId = req.params.id;
      console.log(campaignId);
      const donations = await Donation.find({ 'campaign.id': campaignId });
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // Get all donations made by a user
const getDonationsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const donations = await Donation.find({ donor: userId }).populate('campaign');
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  createDonation,
  getAllDonations,
  getDonation,
  deleteDonation,
  getDonationsByCampaign,
  getDonationsByUser,
  createDonationPaypal
};
