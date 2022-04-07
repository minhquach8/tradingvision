const Reminder = require("../models/Reminder");
const moment = require("moment");

const startOfDay = moment(new Date().setUTCHours(0, 0, 0, 0)).utc().valueOf();
const endOfDay = moment(new Date().setUTCHours(23, 59, 59, 999))
	.utc()
	.valueOf();

async function queryInfo() {
	const reminder = await Reminder.find({
		RemindAt: { $gt: startOfDay, $lt: endOfDay },
		IsSend: false,
	});
	const result = reminder.map(({ _id, Title, Content, RemindAt, Email }) => ({
		_id,
		Title,
		Content,
		RemindAt,
		Email,
	}));
	return result;
}

async function isSend(id) {
	await Reminder.findOneAndUpdate({ _id: id }, { IsSend: true });
}

module.exports = { queryInfo, isSend };
