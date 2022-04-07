const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
	Ceiling: Number,
	Floor: Number,
	Highest: Number,
	Lowest: Number,
	Match: Number,
	PreviousClose: Number,
	StockExchange: { type: String, enum: ["hose", "hnx", "upcom"] },
	Ticker: String,
	Time: Number,
	TimeStamp: Number,
	Volume: Number,
});

module.exports = mongoose.model("Stock", stockSchema);
