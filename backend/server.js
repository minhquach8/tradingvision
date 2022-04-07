//* Import modules
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const schedule = require("node-schedule");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

//* Import express and initialize
const express = require("express");
const app = express();

/* Load Config */
// .env
require("dotenv").config({ path: "./config/.env" });
// Google passport
require("./config/passportGoogle")(passport);
// Facebook passport
require("./config/passportFacebook")(passport);

// CONSTANT VARIABLES
const PORT = process.env.PORT || 5000;

// Sessions
app.use(
	session({
		secret: process.env.SECRET_KEY,
		// Forces the session to be saved back to the session store
		resave: true,
		// Forces the session that is 'uninitialized to be saved to the store
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24 * 1000,
		},
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

/* ====================================================== */
/* MIDDLEWARE */
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { ensureAuth } = require("./middleware/authentication");

app.use(cors());
app.use(express.json());
// app.use(express.static("./tradingvision/build"));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

/* ====================================================== */
/* ROUTES */
// GoogleAuth
const googleAuthRoutes = require("./routes/googleAuth.route");
app.use(googleAuthRoutes);

// FacebookAuth
const facebookAuthRoutes = require("./routes/facebookAuth.route");
app.use(facebookAuthRoutes);

// Delete User
const deleteUserRoute = require("./routes/deleteUser.route");
app.use("/api/deleteuser", deleteUserRoute);

// Company Info
const companyinfoRoutes = require("./routes/companyinfo.route");
app.use("/api/companyinfo", companyinfoRoutes);

// Stocks
const stocksRoutes = require("./routes/stock.route");
app.use("/api/stocks", stocksRoutes);

// ForPrediction
const forPredictionRoutes = require("./routes/forprediction.route.js");
app.use("/api/forpredictions", forPredictionRoutes);

// Predictions
const predictionRoutes = require("./routes/prediction.route");
app.use("/api/predictions", predictionRoutes);

// ForCandlestick
const forCandlestickRoutes = require("./routes/forCandlestick.route");
app.use("/api/forcandlesticks", forCandlestickRoutes);

// Reminders
const reminderRoutes = require("./routes/reminder.route");
app.use("/api/reminders", ensureAuth, reminderRoutes);

// Favorite
const favoriteRoutes = require("./routes/favorite.route");
app.use("/api/favorites", ensureAuth, favoriteRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Add data into ForCandlestick collection
const ses = ["hose", "hnx", "upcom"];
const addDataForCandlestick = require("./controllers/forCandlestick");
const addJob = schedule.scheduleJob("10 15 * * *", () => {
	for (se of ses) {
		addDataForCandlestick(se);
		addJob.cancel(true);
	}
});

// Send Reminder mail
const mainReminder = require("./SendMail/reminder");
const mJob = schedule.scheduleJob("* * * * *", () => {
	mainReminder();
	mJob.cancel(true);
});

app.use(express.static("./tradingvision/build"));

/* ====================================================== */
// Server is listening
const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, console.log(`Server is running on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
