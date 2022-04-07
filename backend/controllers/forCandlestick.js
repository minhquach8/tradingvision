const ForCandlestick = require("../models/ForCandlestick");
const Stock = require("../models/Stock");

const addDataForCandlestick = async (se) => {
	try {
		const stocks = await Stock.find({ StockExchange: se })
			.sort("-TimeStamp")
			.limit(100)
			.select("-_id");
		stocks.map(
			async ({
				Ticker,
				StockExchange,
				TimeStamp,
				PreviousClose,
				Highest,
				Lowest,
				Match,
				Volume,
			}) => {
				const data = {
					Ticker: Ticker,
					StockExchange: StockExchange,
					Time: TimeStamp,
					Open: PreviousClose,
					High: Highest,
					Low: Lowest,
					Close: Match,
					Volume:
						StockExchange === "hose" ? Volume * 1000 : Volume * 100,
				};
				await ForCandlestick.create(data);
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = addDataForCandlestick;
