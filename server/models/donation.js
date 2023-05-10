const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  donor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  campaign: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true
    },
    title: {
      type: String,
      //required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentIntentId: {
    type: String,
  //  required: true
  }
});

module.exports = mongoose.model('Donation', donationSchema);
