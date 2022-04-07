import React, { useState, useEffect } from "react";
import ReminderInfo from "../../components/reminder/ReminderInfo";
import ReminderEmpty from "../../components/reminder/ReminderEmpty";
import axios from "axios";
import Login from "../login/Login";
import useStyles from "./style";
import { CircularProgress } from "@material-ui/core";

const Reminder = ({ user }) => {
	const [reminders, setReminders] = useState([]);
	const [loading, setLoading] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		retrieveReminders();
	}, []);

	const retrieveReminders = async () => {
		setLoading(true);
		await setInterval(() => {
			axios
				.get(`https://trading-vision.herokuapp.com/api/reminders`)
				.then((response) => {
					setReminders(response.data.reminder);
					setLoading(false);
				});
		}, 800);
	};

	return (
		<div>
			{user ? (
				<>
					{loading ? (
						<div className={classes.loading_spinner}>
							<CircularProgress
								style={{ backgroundColor: "primary" }}
							/>
						</div>
					) : (
						<>
							{reminders.length === 0 ? (
								<ReminderEmpty />
							) : (
								<ReminderInfo reminders={reminders} />
							)}
						</>
					)}
				</>
			) : (
				<Login />
			)}
		</div>
	);
};

export default Reminder;
