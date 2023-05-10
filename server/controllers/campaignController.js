const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Organization = require("../models/Organization");

// Create a new campaign
const newCampaign = async (req, res) => {
  try {
    
      const campaign = new Campaign({
        title: req.body.title,
        description: req.body.description,
        goalAmount: req.body.goalAmount,
        currentAmount: 0,
        deadline: req.body.deadline,
        cause: req.body.cause,
       image : req.file.filename,
       organization:req.body.organizationId,
      });
     
      console.log(campaign);
      await campaign.save();
      res.status(201).send(campaign);
    
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.send(campaigns);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCampaignNameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    res.status(200).send(campaign.cause);
  } catch (error) {
    console.error(`Failed to get campaign name by ID: ${error}`);
    res.status(500).send(error);
  }
};
const getCampaignCauseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    res.status(200).send(campaign.cause);
  } catch (error) {
    console.error(`Failed to get campaign name by ID: ${error}`);
    res.status(500).send(error);
  }
};

// Update a campaign by ID
const UpdateCampaign = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send();
    }
    updates.forEach(update => campaign[update] = req.body[update]);
    await campaign.save();
    res.send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Update a campaign by ID
const CompleteCampaign = async (id, res) => {

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).send();
    }
    const CompleteCampaign = await Campaign.findByIdAndUpdate(
      id, { status: 'completed' }
    );
    res.send(CompleteCampaign);
  } catch (error) {
    console.log(res);
  }
};

// Delete a campaign by ID
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).send();
    }
    res.send(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Accept a campaign
const acceptCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIfCampaignExist = await Campaign.findById(id);
    if (!checkIfCampaignExist) {
      throw new Error("campaign not found!");
    }
    const campaign = await Campaign.findByIdAndUpdate(
      id, { status: 'accepted' }
    );
    res.status(200).json({ message: "campaign accepted", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Increment campaign current Amount
const incrementAmount = async (id,amount) => {
  try {

    const checkIfCampaignExist = await Campaign.findById(id);
    if (!checkIfCampaignExist) {
      throw new Error("campaign not found!");
    }
    const campaign = await Campaign.findByIdAndUpdate(
      id, { $inc: { currentAmount: amount } }, // Use $inc to increment the value
      { new: true });
    console.log("current amount",  campaign);
  } catch (error) {
    console.log( error.message );
  }
};
// Refuse a campaign
const refuseCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkIfCampaignExist = await Campaign.findById(id);
    if (!checkIfCampaignExist) {
      throw new Error("campaign not found!");
    }
    const campaign = await Campaign.findByIdAndUpdate(
      id, { status: 'refused' }
    );
    res.status(200).json({ message: "campaign refused", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const organizationByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const organizations = await Organization.find({
      owner: userId,
      status: "active",
    });
    res.status(200).json(organizations );
   
  } catch (err) {
   res.json(err);
  }
};

module.exports ={
  UpdateCampaign,
  deleteCampaign,
  getAllCampaigns,
  newCampaign, findById,
  refuseCampaign,
  acceptCampaign,
  CompleteCampaign,
  getCampaignNameById,
  organizationByUser, incrementAmount,
  getCampaignCauseById
  
};
