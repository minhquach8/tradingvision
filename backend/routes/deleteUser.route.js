const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/deleteUser.controller");

router.route("/").get(deleteUser);

module.exports = router;
