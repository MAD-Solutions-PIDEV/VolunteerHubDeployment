const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  },
  winner: {
    type: String,
  },
},{
  timestamps: true,
});

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    image: String,
    phone: String,
    birthday: String,
    googleId: String,
    facebookId: String,
    availableServices: [
      {
      accommodations: String, 
      food: String, 
      internet: {
        type: String,
        enum: ["available", "not available"],
      },
      } 
    ],
    languageSpoken: [
      {
        language: String  ,
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
        },
      },
    ],
    Skills: {
      type: [{}],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
    gender: {
      type: String,
      enum: ["Male", "Female", "other"],
    },
    username: String,
    email: String,
    password: String,
    favoriteHost: [String],
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
    },
    lastLogin: Date,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    nfts: {type:[nftSchema],
      default: []
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    donationTimes: {
      type: Number,
      default: 0
    },
    rank: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rank",
    },
  ],
    permissions: {
      type: [String],
      default: [],
    },
    organizations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    ],
    missions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
      },
    ],
    hasAnimals: {
      type: Boolean,
      default: false,
    },
    musicAllowed: {
      type: Boolean,
      default: true,
    },
    doesSmoke: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", UserSchema);
