const mongoose = require('mongoose');

// schema


const HostSchema = new mongoose.Schema({
  HostID: {
    type: Number,
    required: true,
  },
  FullName: {
    type: String,
    required: true,
  },
  Password: {
    type: Number,
    required: true,
  },
  Gender:{
    type: String,
    required: true,
  },

  Location: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  ProfileImage: {
    type: String,
    required: true,
  },
  AvalaibleServices: {
    type: String,
    required: true,
  },
  LanguageSpoken: {
    type: String,
    required: true,
  },
});

// model


const host = mongoose.model("Host", HostSchema); //transfer to collection
module.exports = host;


