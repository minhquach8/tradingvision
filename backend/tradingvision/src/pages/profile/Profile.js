import { Typography, Avatar, Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./style";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
	DialogTitle,
	Dialog,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Profile = ({ user }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const deleteUser = () => {
		window.open(
			"https://trading-vision.herokuapp.com/api/deleteuser",
			"_self"
		);
	};

	return (
		<div className={classes.container}>
			{user ? (
				<>
					<Typography variant="h5" className={classes.title}>
						User Profile
					</Typography>
					<Grid container spacing={2} className={classes.Grid}>
						<Grid item alignItems="center">
							<Avatar
								src={user.image}
								alt="image"
								className={classes.avatar}
							/>
						</Grid>
						<Grid item className={classes.info_grid}>
							<Typography
								gutterBottom
								className={classes.username}
							>
								{user.displayName}
							</Typography>
							<Typography gutterBottom className={classes.info}>
								{user.email}
							</Typography>
						</Grid>
					</Grid>
					<div className={classes.delete_account}>
						<Grid
							container
							spacing={2}
							className={classes.Grid_delete}
						>
							<Grid item align="center">
								<HighlightOffIcon sx={{ fontSize: 90 }} />
								<Typography className={classes.delete_title}>
									Delete Account
								</Typography>
							</Grid>
							<Grid item className={classes.delete_warning}>
								<Typography
									className={classes.delete_permanent}
								>
									Permanently delete
								</Typography>
								<Typography className={classes.warning}>
									Be careful - All of your data and
									information will be deleted.
								</Typography>
								<Button
									className={classes.btn}
									onClick={handleOpen}
								>
									Delete All
								</Button>
								<Dialog open={open} onClose={handleClose}>
									<DialogTitle alignItems="center">
										<DeleteOutlineIcon
											sx={{
												fontSize: 60,
												color: "#f12323",
												marginLeft: "42.5%",
											}}
										/>
										<Typography
											align="center"
											className={classes.dialog_title}
										>
											Are you sure you want to delete your
											account?
										</Typography>
									</DialogTitle>
									<DialogContentText
										className={classes.dialog_content}
									>
										<Typography
											align="center"
											className={
												classes.dialog_content_text
											}
										>
											This will delete all the
											informationrelated to your account.
										</Typography>
										<Typography
											align="center"
											className={
												classes.dialog_content_text
											}
										>
											You cannot undo this action
										</Typography>
									</DialogContentText>
									<DialogActions justifyItems="right">
										<Button
											className={classes.btn_Delete}
											onClick={deleteUser}
											type="submit"
										>
											Delete
										</Button>
										<Button
											className={classes.btn_Cancel}
											onClick={handleClose}
										>
											Cancel
										</Button>
									</DialogActions>
								</Dialog>
							</Grid>
						</Grid>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Profile;
