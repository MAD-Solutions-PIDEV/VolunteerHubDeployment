const Address = require("../models/address");

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAddressesByCountry = async (req, res) => {
  try {
    const addresses = await Address.find({
      country: req.params.country,
    }).exec();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAddressesByState = async (req, res) => {
  try {
    const addresses = await Address.find({ state: req.params.state }).exec();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAddressById,
  getAddresses,
  getAddressesByCountry,
  getAddressesByState,
};
