const mongoose = require("mongoose");

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    ipAddress :String,
    os :String,
    browser :String,
    uaString :String,
    device :String,
    newDate: Date,
    action :String,
    user: String
  })
);

module.exports = Activity;
