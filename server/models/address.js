const mongoose = require("mongoose");

const Address = mongoose.model(
  "Address",
  new mongoose.Schema({
    firstAddress: String,
    secondAddress: String,
    country: String,
    zipCode: String,
    state: String
  })
);

module.exports = Address;
