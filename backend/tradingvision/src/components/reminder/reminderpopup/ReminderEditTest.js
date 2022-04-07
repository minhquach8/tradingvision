import React, { useState, useEffect } from "react";
import useStyles from "../style";
import { useForm } from "react-hook-form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
// import { responsiveProperty } from '@mui/material/styles/cssUtils';
// import { is } from 'date-fns/locale';
// import { useCallback } from 'react';

const useStyles_form = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "80%",
			margin: theme.spacing(1),
		},
	},
}));
const ReminderEditTest = (props) => {
	const classes = useStyles();
	const classes_form = useStyles_form();

	const {
		open,
		onClose,
		values,
		setValues,
		date,
		setDate,
		stockTicker,
		setTicker,
	} = props;

	const initialValues = {
		title: "",
		ticker: "",
		time: "",
		content: "",
	};

	console.log(values);
	const [stocks, setStock] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const resetForm = () => {
		setValues(initialValues);
	};
	const handleClose = () => {
		resetForm();
		onClose();
	};

	const handleInputChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	// console.log(typeof(date))

	const onSubmit = (data) => {
		console.log(data);
		fetch(`/api/reminders/${props.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				Content: values.content,
				Title: values.title,
				Ticker: stockTicker.ticker,
				RemindAt: date.getTime(),
			}),

			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then(console.log);

		resetForm();
		handleClose();
	};

	const componentDidMount = async () => {
		axios
			.get(`https://trading-vision.herokuapp.com/api/stocks`)
			.then((response) => {
				setStock(response.data.stocks);
			});
	};

	useEffect(() => {
		componentDidMount();
	}, []);

	const listStocks = stocks.map((stock) => {
		return {
			ticker: stock.Ticker,
		};
	});

	const options = listStocks.map((option) => {
		const firstLetter = option.ticker[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
			...option,
		};
	});

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: "white",
						height: "500px",
						width: "560px",
					},
				}}
			>
				<form
					className={classes_form.root}
					onSubmit={handleSubmit(onSubmit)}
				>
					<DialogTitle>
						<TextField
							component="form"
							variant="standard" //to disable outline
							required
							placeholder="Add Title"
							noValidate
							autoComplete="off"
							InputProps={{
								disableUnderline: true,
								style: {
									fontSize: "18px",
									fontFamily: "Montserrat",
									color: "black",
								},
							}}
							name="title"
							value={values.title}
							onChange={(e) => handleInputChange(e)}
						/>
						{errors.title && <p>Title is empty</p>}
					</DialogTitle>
					<div className={classes.line}></div>
					<DialogContent className={classes.dialog_content}>
						<DialogContentText
							style={{
								color: "black",
							}}
						>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DateTimePicker
									component="form"
									noValidate
									autoComplete="off"
									renderInput={(props) => (
										<TextField {...props} required />
									)}
									name="time"
									value={date}
									onChange={(newValue) => setDate(newValue)}
									className={classes.calendar}
									inputProps={{
										disableUnderline: true,
										style: {
											color: "black",
											fontFamily: "Montserrat",
											fontSize: "15px",
										},
										readOnly: true,
									}}
								/>
							</LocalizationProvider>
						</DialogContentText>

						<DialogContentText>
							<Autocomplete
								id="grouped-demo"
								selectOnFocus
								name="ticker"
								options={options.sort(
									(a, b) =>
										-b.firstLetter.localeCompare(
											a.firstLetter
										)
								)}
								groupBy={(option) => option.firstLetter}
								getOptionLabel={(option) => option.ticker}
								getOptionSelected={(option, value) =>
									option.ticker === value.ticker
								}
								isOptionEqualToValue={(option, value) =>
									option.ticker === value.ticker
								}
								value={
									options.filter((item) => {
										return (
											item.ticker === stockTicker.ticker
										);
									})[0] || ""
								}
								onChange={(event, value) => setTicker(value)}
								sx={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										{...params}
										required
										label={
											<Typography
												style={{
													fontFamily: "Montserrat",
												}}
											>
												Choose a ticker...
											</Typography>
										}
									/>
								)}
							/>
							{errors.ticker && <p>Ticker is empty</p>}
						</DialogContentText>

						<DialogContentText>
							<TextField
								component="form"
								noValidate
								autoComplete="off"
								required
								placeholder="Content"
								multiline
								rows={4}
								className={classes.reminder}
								InputProps={{
									disableUnderline: true,
									style: {
										fontSize: "17px",
										fontFamily: "Montserrat",
										color: "black",
										width: "500px",
									},
								}}
								variant="outlined"
								size="large"
								name="content"
								value={values.content}
								defaultValue={values.content}
								onChange={(e) => handleInputChange(e)}
							/>
							{errors.content && <p>Content is empty</p>}
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.btn}>
						<Button type="submit" className={classes.btn_Save}>
							Save
						</Button>
						<Button
							onClick={handleClose}
							className={classes.btn_Cancel}
						>
							Cancel
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default ReminderEditTest;
