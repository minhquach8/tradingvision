require("dotenv").config({ path: "../config/.env" });
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/* ====================================================== */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, title, content) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.EMAIL,
				password: process.env.EMAIL_PASS,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const mailOptions = {
			from: "Trading Vision <rdteam1510@gmail.com>",
			to: email,
			subject: title,
			text: content,
		};

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
}

module.exports = sendMail;
