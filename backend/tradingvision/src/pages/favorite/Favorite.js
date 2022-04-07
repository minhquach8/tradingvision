import React, { useState, useEffect } from "react";
import FavoriteInfo from "../../components/favorite/FavoriteInfo";
import FavoriteEmpty from "../../components/favorite/FavoriteEmpty";
import Login from "../login/Login";
import axios from "axios";
import useStyles from "./style";
import { CircularProgress } from "@material-ui/core";

const Favorite = ({ user }) => {
	const [favorites, setFavorite] = useState([]);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getFavorite();
	}, []);

	const getFavorite = async () => {
		setLoading(true);
		await setInterval(() => {
			axios
				.get(`https://trading-vision.herokuapp.com/api/favorites`)
				.then((response) => {
					setFavorite(response.data.favorites);
					setLoading(false);
				});
		}, 500);
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
							{favorites.length === 0 ? (
								<FavoriteEmpty />
							) : (
								<FavoriteInfo favorites={favorites} />
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

export default Favorite;
