// Import Modules
const CompanyInfo = require("../models/CompanyInfo");
const { NotFoundError } = require("../errors");

exports.getAllCompanyInfo = async (req, res) => {
	const { companyname, stockexchange, industry } = req.query;
	const queryObject = {};

	if (companyname) {
		queryObject.CompanyName = { $regex: companyname, $options: "i" };
	}

	if (stockexchange) {
		queryObject.StockExchange = stockexchange;
	}

	if (industry) {
		queryObject.Industry = industry;
	}

	let result = CompanyInfo.find(queryObject).lean();
	const companyinfo = await result;
	if (!companyinfo) {
		throw new NotFoundError("Cannot find company");
	}
	res.status(200).json({ success: true, companyinfo });
};

exports.getCompanyInfoByTicker = async (req, res) => {
	const companyinfo = await CompanyInfo.find({
		Ticker: req.params.ticker,
	});
	if (!companyinfo) {
		throw new NotFoundError("Cannot find company");
	}
	res.status(200).json({ success: true, companyinfo });
};

// exports.getRelevant = async (req, res) => {
// 	CompanyInfo.aggregate([
// 		{
// 			$lookup: {
// 				from: "stocks",
// 				localField: "Ticker",
// 				foreignField: "Ticker",
// 				as: "Ticker",
// 			},
// 		},
// 	]).exec((err, result) => {
// 		if (err) throw err;
// 		res.send(result[0].Ticker);
// 	});
// };
