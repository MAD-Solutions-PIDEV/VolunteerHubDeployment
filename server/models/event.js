const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name: String,
    type: String,
    theme: String,
    image: String,
    status: String,
    description: String,
    startDate: Date,
    endDate: Date,
    nbParticipant: String,
    subscribe: String,
    price: String,
    approve: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    location: [
      {
        latitude: String,
        longitude: String,
        country: String
      }
    ],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    sdgs: [
      {
      name: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);