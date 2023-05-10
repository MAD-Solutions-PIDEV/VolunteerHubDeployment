const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['inactive', 'completed', 'refused','accepted'],
    default: 'inactive'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cause:{
    type: String,
    enum: ['Education', 'Sport', 'Urgence','Environment','Animal Protection','Human Help','Health','Social','Economic Development','Culture'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
