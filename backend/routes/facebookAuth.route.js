// Import modules
const express = require("express");
const {
	facebookAuthCallback,
	successLogin,
	failedLogin,
	logout,
	facebookAuth,
	login,
} = require("../controllers/facebookAuth.controller");
const { ensureGuest, ensureAuth } = require("../middleware/authentication");
const router = express.Router();

// @desc Login
// @method GET
// @route /login
router.route("/auth/login").get(ensureGuest, login);

// @desc Success login
// @method GET
// @route /auth/success
router.route("/auth/success").get(ensureAuth, successLogin);

// @desc Fail login
// @method GET
// @route /auth/failure
router.route("/auth/failure").get(failedLogin);

// @desc Logout User
// @method GET
// @route /auth/logout
router.route("/auth/logout").get(logout);

// @desc Auth with facebook
// @method GET
// @route /auth/facebook
router.route("/auth/facebook").get(facebookAuth);

// @desc Facebook auth callback
// @method GET
// @route /facebook/callback
router.route("/auth/facebook/callback").get(facebookAuthCallback);

module.exports = router;
