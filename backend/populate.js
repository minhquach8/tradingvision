require("dotenv").config({ path: "./config/.env" });

const connectDB = require("./config/db");

/* ====================================================== */
/* --- You can import your schema and json file like below --- */
//* Import Schema
const Stocks = require("./models/Stock");

//* Import JSON file
const jsonStocks = require("./DATA/stocks.json");

const start = async () => {
	try {
		await connectDB();
		//* Clean up your collection
		await Stocks.deleteMany();
		await Stocks.create(jsonStocks);
		console.log("Success!!");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(0);
	}
};

start();
