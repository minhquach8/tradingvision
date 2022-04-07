const mongoose = require("mongoose");

const forCandlestickSchema = new mongoose.Schema({
	Ticker: {
		type: String,
		trim: true,
		index: true,
	},
	StockExchange: {
		type: String,
		trim: true,
		index: true,
	},
	Time: {
		type: Number,
		trim: true,
	},
	Open: {
		type: Number,
	},
	High: {
		type: Number,
	},
	Low: {
		type: Number,
	},
	Close: {
		type: Number,
	},
	Volume: {
		type: Number,
	},
});

module.exports = mongoose.model("ForCandlestick", forCandlestickSchema);
