import React, { useState, useEffect, useRef } from "react";
import useStyles from "./style";
import {
	Container,
	Typography,
	Button,
	Checkbox,
	IconButton,
	CircularProgress,
	Divider,
	Grid,
} from "@material-ui/core";
import TabInfo from "../../components/specificticker/TabInfo";
import Chart from "../../components/specificticker/ChartTab";
import ComparePopup from "../../components/compare/ComparePopup";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Dialog, Box } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { useParams } from "react-router-dom";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
function Stockpage({ user }) {
	const classes = useStyles();
	const myRef = useRef(null);
	const executeScroll = () => scrollToRef(myRef);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClosed = () => setOpen(false);
	const label = { inputProps: { "aria-label": "Checkbox favorite" } };

	// Set selected row and tab
	const [selectedID, setSelectedID] = React.useState(null);
	const handleSelection = (newSelection) => {
		if (selectedID !== newSelection) {
			setSelectedID(newSelection);
		} else {
			setSelectedID(null);
		}
	};
	const [selectedTab, setSelectedTab] = React.useState("1");
	const { ticker } = useParams();
	const [company, setCompany] = useState([]);
	const [favorites, setFavorite] = useState([]);
	//check whether fav or not
	const [isFavorite, setIsFavorite] = useState(null);

	// get company info
	useEffect(() => {
		getCompanyInfo();
	}, []);

	const getCompanyInfo = async () => {
		await axios
			.get(
				`https://trading-vision.herokuapp.com/api/companyinfo/${ticker}`
			)
			.then((response) => {
				setCompany(response.data.companyinfo);
			});
	};

	// Get company Id
	const CompanyId = company.map((info) => {
		return info._id;
	});

	const checkid = (obj) => obj.CompanyId === CompanyId[0];

	const getFavorite = async () => {
		await axios
			.get(`https://trading-vision.herokuapp.com/api/favorites`)
			.then((response) => {
				setFavorite(response.data.favorites);
			});
	};

	useEffect(() => {
		getFavorite();
		function checkout() {
			if (favorites.some(checkid) === true) {
				setIsFavorite(true);
			} else if (favorites.some(checkid) === false) {
				setIsFavorite(false);
			}
		}
		checkout();
		console.log(favorites);
	});

	const addFavorite = async () => {
		axios
			.post(`https://trading-vision.herokuapp.com/api/favorites`, {
				UserId: user.userId,
				CompanyId: CompanyId[0],
			})
			.then((response) => {
				console.log(response);
			});
	};

	const deleteFavorite = async (id) => {
		axios
			.delete(`https://trading-vision.herokuapp.com/api/favorites/` + id)
			.then(alert(`Deleted stock from your favorite list`))
			.then((response) => {
				console.log(response);
			});
	};

	return (
		<>
			{user ? (
				<Container className={classes.container}>
					<div className={classes.title}>
						{company.map((info) => (
							<>
								<Grid container>
									<Grid item xs={1}>
										<Typography
											variant="h6"
											className={classes.field}
										>
											{info.StockExchange.toUpperCase()}
										</Typography>
									</Grid>
									<Divider
										orientation="vertical"
										flexItem
										light={true}
										className={classes.divider}
										style={{
											height: "30px",
											width: "3px",
											marginLeft: "-1%",
											marginRight: "2%",
											backgroundColor: "rgb(255, 165, 0)",
										}}
									/>
									<Grid item xs={10}>
										<Typography
											variant="h6"
											className={classes.field}
										>
											{info.Industry}
										</Typography>
									</Grid>
								</Grid>
								<Typography
									variant="h5"
									className={classes.name}
								>
									{info.CompanyName} ({info.Ticker})
									<Checkbox
										{...label}
										icon={
											<FavoriteBorderIcon
												sx={{
													fontSize: 45,
													color: "#fff",
													marginTop: "15%",
												}}
											/>
										}
										className={classes.fav_border}
										checked={isFavorite}
										checkedIcon={
											<Favorite
												sx={{
													fontSize: 45,
													marginTop: "15%",
												}}
											/>
										}
										onChange={(e) => {
											if (isFavorite === false) {
												addFavorite();
											} else {
												deleteFavorite(CompanyId[0]);
											}
											setIsFavorite(e.target.checked);
										}}
									/>
								</Typography>

								<div className={classes.line} />

								<div className={classes.info}>
									<TabInfo info={info} />
								</div>
							</>
						))}
					</div>
					<Button
						variant="contained"
						className={classes.button}
						onClick={handleOpen}
					>
						Compare
					</Button>
					<Dialog
						open={open}
						onClose={handleClosed}
						aria-labelledby="keep-mounted-modal-title"
						aria-describedby="keep-mounted-modal-description"
						BackdropProps={{
							style: { backgroundColor: "rgba(0,0,0,0.50)" },
						}}
						PaperProps={{
							style: {
								backgroundColor: "rgba(0,0,0,0.90)",
								color: "white",
								height: "550px",
								width: "600px",
							},
						}}
					>
						<Box>
							<IconButton
								style={{ color: "white", marginLeft: "85%" }}
								onClick={handleClosed}
							>
								<CloseIcon />
							</IconButton>
							<ComparePopup
								selectedID={selectedID}
								setSelectedID={setSelectedID}
								selectedTab={selectedTab}
								setSelectedTab={setSelectedTab}
								myRef={myRef}
								executeScroll={executeScroll}
								handleSelection={handleSelection}
							/>
						</Box>
					</Dialog>

					<div className={classes.graph}>
						<Chart compareTicker={selectedID} />
					</div>
				</Container>
			) : (
				<>
					<Container>
						<CircularProgress
							style={{ backgroundColor: "primary" }}
							className={classes.loading}
						/>
					</Container>
				</>
			)}
		</>
	);
}

export default Stockpage;
