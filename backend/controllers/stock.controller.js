const Stock = require("../models/Stock.js");
const NotFoundError = require("../errors");

exports.getAllStocks = async (req, res) => {

	try {
		const stocks = await Stock.find({}).limit(300);
		res.status(200).json({ stocks });
	} catch (error) {
		console.log(error)
	}
};

exports.getAllStocksQuery = async (req, res) => {
	const { ticker, stockexchange, sort, fields } = req.query;
	const queryObject = {};

	if (ticker) {
		queryObject.Ticker = ticker;
	}

	if (stockexchange) {
		queryObject.StockExchange = {
			$regex: stockexchange,
			$options: "i",
		};
	}

	let result = Stock.find(queryObject);
	//* Sort
	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	} else {
		result = result.sort("-TimeStamp");
	}
	//* Select Field
	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		result = result.select(fieldsList);
	}
	//* Limit and Skip
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const stocks = await result;
	res.status(200).json({ stocks });
};

exports.getStockByTicker = async (req, res) => {
	const stock = await Stock.find({ Ticker: req.params.ticker }).sort(
		"-TimeStamp"
	);
	if (!stock) {
		throw new NotFoundError("Stock does not exist");
	}
	res.status(200).json({ stock });
};
