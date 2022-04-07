const express = require("express");
const router = express.Router();
const {
	getReminder,
	createReminder,
	updateReminder,
	deleteReminder,
} = require("../controllers/reminder.controller");

router.route("/").get(getReminder).post(createReminder);
router.route("/:id").patch(updateReminder).delete(deleteReminder);

module.exports = router;
