const mongoose = require("mongoose");

const companyInfoSchema = new mongoose.Schema({
	Address: String,
	BasicEPS: String,
	BookValue: String,
	CompanyName: String,
	DilutedEPS: String,
	Industry: String,
	Info: String,
	ListedShares: String,
	MarketCapitalization: String,
	OutstandingShares: String,
	"P/E": String,
	ROA: String,
	ROE: String,
	StockExchange: { type: String, enum: ["hose", "hnx", "upcom"] },
	Ticker: String,
	TotalAssets: String,
	Website: String,
});

module.exports = mongoose.model("CompanyInfos", companyInfoSchema);
