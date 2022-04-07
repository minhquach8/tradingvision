import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress } from "@material-ui/core/";
import axios from "axios";
// Styles
const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		type: "dark",
	},
});
const useStyles = makeStyles({
	root: {
		"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus": {
			outline: "none",
		},
		"&.MuiDataGrid-menuIcon &.MuiDataGrid-menuIconButton 	&.MuiDataGrid-menuOpen": {
			color: "white",
		},
		"MuiTablePagination-root .css-rtrcn9-MuiTablePagination-root": {
			color: "white",
		},
	},
	loading_spinner: {
		marginTop: "20%",
	},
});
const columns = [
	{
		field: "ticker",
		headerName: "Ticker",
		width: 150,
	},
	{
		field: "ceiling",
		headerName: "Ceiling",
		type: "number",
		width: 150,
	},
	{
		field: "floor",
		headerName: "Floor",
		type: "number",
		width: 150,
	},
	{
		field: "highest",
		headerName: "Highest",
		type: "number",
		width: 150,
	},
	{
		field: "lowest",
		headerName: "Lowest",
		type: "number",
		width: 150,
	},
	{
		field: "match",
		headerName: "Match",
		type: "number",
		width: 150,
	},
	{
		field: "volume",
		headerName: "Volume",
		type: "number",
		width: 150,
	},
];

// Define icons
export function SortedDescendingIcon() {
	return (
		<ArrowDownwardIcon
			className="icon"
			sx={{
				color: "white",
			}}
		/>
	);
}

export function SortedAscendingIcon() {
	return (
		<ArrowUpwardIcon
			className="icon"
			sx={{
				color: "white",
			}}
		/>
	);
}
export function MenuIcon() {
	return (
		<MoreVertIcon
			className="icon"
			sx={{
				color: "white",
			}}
		/>
	);
}
// Datagirid
const DataGridDemo = ({ stockExchange, user }) => {
	const history = useNavigate();
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [stocks, setStock] = useState([]);
	const [pageSize, setPageSize] = useState(10);

	// Get Data
	useEffect(() => {
		setInterval(() => {
			componentDidMount(stockExchange);
		}, 5000); //reload after 5s
	}, [stockExchange]);

	const componentDidMount = async (stockExchange) => {
		// setLoading(true);
		await axios
			.get(
				`https://trading-vision.herokuapp.com/api/stocks/query?stockexchange=${stockExchange}&limit=100`
			)
			.then((response) => {
				setStock(response.data.stocks);
				setLoading(false);
			});
	};

	const rows = stocks.map((stock) => {
		return {
			id: stock._id,
			ceiling: stock.Ceiling,
			floor: stock.Floor,
			highest: stock.Highest,
			lowest: stock.Lowest,
			match: stock.Match,
			ticker: stock.Ticker,
			volume: stock.Volume,
		};
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<div style={{ height: 600, width: "100%", color: "white" }}>
				{loading ? (
					<div className={classes.loading_spinner}>
						<CircularProgress
							style={{ backgroundColor: "primary" }}
						/>
					</div>
				) : (
					<>
						{user ? (
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={pageSize}
								onPageSizeChange={(newPage) =>
									setPageSize(newPage)
								}
								rowsPerPageOptions={[10, 20, 50]}
								pagination
								sx={{
									color: "white",
									fontFamily: "Montserrat",
									cursor: "pointer",
									fontSize: 16,
									"& .MuiButton-root": {
										paddingBottom: 3,
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-root": {
										color: "white",
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-selectIcon": {
										color: "white",
									},
									// Pagination
									"& .MuiTablePagination-selectLabel": {
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-displayedRows": {
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-select": {
										fontFamily: "Montserrat",
									},
								}}
								components={{
									Toolbar: GridToolbar,
									//Pagination: CustomPagination,
									ColumnSortedDescendingIcon: SortedDescendingIcon,
									ColumnSortedAscendingIcon: SortedAscendingIcon,
									ColumnMenuIcon: MenuIcon,
								}}
								classeName={classes.root}
								initialState={{
									sorting: {
										sortModel: [
											{ field: "ticker", sort: "asc" },
										],
									},
								}}
								onRowClick={(params) =>
									history(`/stocks/${params.row.ticker}`)
								}
							/>
						) : (
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={pageSize}
								onPageSizeChange={(newPage) =>
									setPageSize(newPage)
								}
								rowsPerPageOptions={[10, 20, 50]}
								pagination
								sx={{
									color: "white",
									fontFamily: "Montserrat",
									cursor: "pointer",
									fontSize: 16,
									"& .MuiButton-root": {
										paddingBottom: 3,
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-root": {
										color: "white",
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-selectIcon": {
										color: "white",
									},
									// Pagination
									"& .MuiTablePagination-selectLabel": {
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-displayedRows": {
										fontFamily: "Montserrat",
									},
									"& .MuiTablePagination-select": {
										fontFamily: "Montserrat",
									},
								}}
								components={{
									Toolbar: GridToolbar,
									//Pagination: CustomPagination,
									ColumnSortedDescendingIcon: SortedDescendingIcon,
									ColumnSortedAscendingIcon: SortedAscendingIcon,
									ColumnMenuIcon: MenuIcon,
								}}
								classeName={classes.root}
								initialState={{
									sorting: {
										sortModel: [
											{ field: "ticker", sort: "asc" },
										],
									},
								}}
								onRowClick={(params) => history(`/login`)}
							/>
						)}
					</>
				)}
			</div>
		</ThemeProvider>
	);
};
export default DataGridDemo;
