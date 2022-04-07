// Import modules
const express = require("express");
const router = express.Router();
const {
	getPredictionByTicker,
} = require("../controllers/prediction.controller");

// @desc Get all predictions
// @method GET
// @route /api/predictions
router.route("/:ticker").get(getPredictionByTicker);

module.exports = router;
