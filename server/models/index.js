const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./user");
db.address = require('./address');
db.role = require("./role");
db.event = require("./event");
db.ROLES = ["admin", "volunteer", "organization", "host"];

module.exports = db;