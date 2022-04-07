// Import modules
const express = require("express");
const router = express.Router();
const {
	getAllCompanyInfo,
	getCompanyInfoByTicker,
	getRelevant,
} = require("../controllers/companyinfo.controller");

// @desc Get all company info
// @method GET
// @route /api/companyinfo
router.route("/").get(getAllCompanyInfo);
// router.route("/relevant").get(getRelevant);

// @desc Get company info by ticker
// @method GET
// @route /api/companyinfo/:ticker
//router.route("/api/companyinfo/:ticker").get(getCompanyInfoByTicker);
router.get("/:ticker", getCompanyInfoByTicker);

module.exports = router;
