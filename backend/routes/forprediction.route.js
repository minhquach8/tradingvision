// Import modules
const express = require("express");
const router = express.Router();
const {
	getAllForPrediction,
	getForPredictionById,
} = require("../controllers/forprediction.controlller");

// @desc Get all docs from ForPrediction
// @method GET
// @route /api/forpredictions
router.route("/").get(getAllForPrediction);

// @desc Get ForPrediction by Ticker
// @method GET
// @route /api/forpredictions/:ticker
router.route("/:ticker").get(getForPredictionById);

module.exports = router;
