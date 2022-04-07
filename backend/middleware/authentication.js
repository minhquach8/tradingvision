module.exports = {
	ensureAuth: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/auth/failure");
		}
	},
	ensureGuest: function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect("/auth/success");
		} else {
			return next();
		}
	},
};
