// Import modules
const express = require("express");
const router = express.Router();
const {
	getAllStocks,
	getAllStocksQuery,
	getStockByTicker,
} = require("../controllers/stock.controller");

// @desc Get all stocks (300 stocks)
// @method GET
// @route /api/stocks
router.route("/").get(getAllStocks);
router.route("/query").get(getAllStocksQuery);

// @desc Get stock by ticker
// @method GET
// @route /api/stocks/:ticker
router.route("/:ticker").get(getStockByTicker);

module.exports = router;
