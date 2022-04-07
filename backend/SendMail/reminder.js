const schedule = require("node-schedule");
const sendMail = require("./sendMail");
const { queryInfo, isSend } = require("./queryInfo");

async function mainReminder() {
	console.log("--Run main--");
	queryInfo()
		.then(async (res) => {
			res.map(({ RemindAt, Title, Content, Email, _id, IsSend }) => {
				if (!IsSend) {
					schedule.scheduleJob(RemindAt, function () {
						isSend(_id).then(() => {});
						sendMail(Email, Title, Content)
							.then((res) => {
								console.log(res);
							})
							.catch((err) => console.log(err));
					});
				}
			});
		})
		.catch((err) => console.log(err));
}

module.exports = mainReminder;
