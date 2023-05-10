const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    issues: {
      type: [String],
    },
    website: {
      type: String,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "archived"],
      default: "inactive",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    wallet: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
