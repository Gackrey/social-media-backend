const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/login");
const { signup } = require("../Controllers/signup");

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
