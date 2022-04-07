const ForCandlestick = require("../models/ForCandlestick");

exports.getDataForCandlestick = async (req, res) => {
	const forCandlestick = await ForCandlestick.find({
		Ticker: req.params.ticker,
	}).sort(
		"Time"
	);
	if (forCandlestick.length === 0) {
		return res.status(404).json({ message: "Cannot find any data" });
	}
	res.status(200).json(forCandlestick);
};
