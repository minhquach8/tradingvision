const express = require("express");
const router = express.Router();
const {
	getFavorites,
	createFavorite,
	deleteFavorite,
} = require("../controllers/favorite.controller");

const CompanyInfo = require("../models/CompanyInfo.js");

// @desc Get favorite
// @method GET
// @route /api/favorites
router.route("/").get(getFavorites).post(createFavorite);

// @desc Delete favorite
// @method DELETE
// @route /api/favorites/:id
router.route("/:companyId").delete(deleteFavorite);

module.exports = router;
