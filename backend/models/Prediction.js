const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
	Ticker: { type: String },
	PredictedPrice: { type: Number },
	Date: { type: Number},
	TimeStamp: { type: Number },
});

module.exports = mongoose.model("Prediction", predictionSchema);
