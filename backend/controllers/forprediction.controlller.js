const { NotFoundError } = require("../errors");
const ForPrediction = require("../models/ForPrediction.js");

exports.getAllForPrediction = async (req, res) => {
	const forPrediction = await ForPrediction.find({});
	if (!forPrediction) {
		throw new NotFoundError("Cannot find any forprediction docs");
	}
	res.status(200).json(forPrediction);
};

exports.getForPredictionById = async (req, res) => {
	const forPrediction = await ForPrediction.find({
		Ticker: req.params.ticker,
	});
	if (!forPrediction) {
		throw new NotFoundError("Cannot find any forprediction docs");
	}
	res.status(200).json(forPrediction);
};
