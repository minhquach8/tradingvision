// Import modules
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Reminder = require("../models/Reminder");

exports.getReminder = async (req, res) => {
	const reminder = await Reminder.find({ UserId: req.user._id });
	res.status(200).json({ reminder });
};

exports.createReminder = async (req, res) => {
	req.body.UserId = req.user._id;
	req.body.Email = req.user.email;
	const reminder = await Reminder.create(req.body);
	res.status(StatusCodes.CREATED).json({ reminder });

};

exports.deleteReminder = async (req, res) => {
	const reminder = await Reminder.findOneAndDelete({ _id: req.params.id });
	if (!reminder) {
		throw new NotFoundError("No reminder with this id");
	}
	res.status(200).json({ reminder });
};

exports.updateReminder = async (req, res) => {
	const reminder = await Reminder.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	if (!reminder) {
		throw new NotFoundError("No reminder with this id");
	}
	res.status(200).json({ reminder });
};
