// Import modules
const express = require("express");
const {
	googleAuthCallback,
	successLogin,
	failedLogin,
	logout,
	googleAuth,
	login,
} = require("../controllers/googleAuth.controller");
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

// @desc Auth with google
// @method GET
// @route /auth/google
router.route("/auth/google").get(googleAuth);

// @desc Google auth callback
// @method GET
// @route /auth/google/callback
router.route("/auth/google/callback").get(googleAuthCallback);

module.exports = router;
