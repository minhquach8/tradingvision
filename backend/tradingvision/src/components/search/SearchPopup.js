import axios from "axios";
import {
	Container,
	InputBase,
	ThemeProvider,
	createTheme,
	TableContainer,
	CircularProgress,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./style";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		type: "dark",
		fontFamily: "Montserrat",
	},
});

const SearchPopup = () => {
	const history = useNavigate();
	const classes = useStyles();
	const [test, setTest] = React.useState(false);
	const handleOpen = () => setTest(true);
	const handleClosed = () => setTest(false);
	const [value, setValue] = React.useState("1");
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [search, setSearch] = React.useState("");

	const [companies, setCompanies] = useState([]);

	// get company info
	useEffect(() => {
		componentDidMount();
	}, []);

	const componentDidMount = async () => {
		setLoading(true);
		axios
			.get("https://trading-vision.herokuapp.com/api/companyinfo")
			.then((response) => {
				setCompanies(response.data.companyinfo);
				setLoading(false);
			});
	};

	const rows = companies.map((company) => {
		return {
			id: company._id,
			ticker: company.Ticker,
			companyName: company.CompanyName,
			industry: company.Industry,
			stockExchange: company.StockExchange,
		};
	});

	const handleSearch = (rows) => {
		return rows.filter(
			(row) =>
				row.ticker.toLowerCase().includes(search) ||
				row.companyName.toLowerCase().includes(search) ||
				row.industry.toLowerCase().includes(search) ||
				row.ticker.includes(search) ||
				row.industry.includes(search) ||
				row.companyName.includes(search) ||
				row.stockExchange.includes(search) ||
				row.stockExchange.includes(search)
		);
	};

	const navigatePage = (row_ticker) => {
		history(`/stocks/${row_ticker}`);
	};
	const refreshPage = () => {
		window.location.reload();
	};
	const [loading, setLoading] = useState(false);

	return (
		<ThemeProvider theme={darkTheme}>
			<Container>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
						onClick={handleOpen}
						style={{ fontFamily: "Montserrat" }}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className={classes.table}>
					{loading ? (
						<div className={classes.loading_spinner}>
							<CircularProgress
								style={{ backgroundColor: "primary" }}
							/>
						</div>
					) : (
						<TableContainer
							className={classes.tableContainer}
							component={Paper}
						>
							<Table stickyHeader aria-label="sticky table">
								<TableHead
									className={classes.tablehead}
									rowCount={rows.length}
								>
									<TableRow>
										{[
											"TICKER",
											"DESCRIPTION",
											"INDUSTRY",
											"STOCK EXCHANGE",
										].map((head) => (
											<TableCell
												className={classes.tablecell}
												key={head}
												align={
													head === "TICKER"
														? ""
														: "left"
												}
											>
												{head}
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									{handleSearch(rows).map((row) => (
										<TableRow
											onClick={() => {
												navigatePage(row.ticker);
												refreshPage();
											}}
											className={classes.row}
											key={row.ticker}
										>
											<TableCell
												component="th"
												scope="row"
												style={{
													fontWeight: "bold",
												}}
												className={classes.cell}
											>
												{" "}
												{row.ticker}
											</TableCell>
											<TableCell
												align="left"
												className={classes.cell}
											>
												{row.companyName}
											</TableCell>
											<TableCell
												align="left"
												className={classes.cell}
											>
												{row.industry}
											</TableCell>
											<TableCell
												align="center"
												className={classes.cell}
											>
												{row.stockExchange.toUpperCase()}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</div>
			</Container>
		</ThemeProvider>
	);
};

export default SearchPopup;
