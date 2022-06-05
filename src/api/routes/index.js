const express = require("express");
const routing = express.Router();
const User = require("./User");



routing.use('/', User);

module.exports = routing;