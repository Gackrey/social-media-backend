const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/login");
const { signup } = require("../Controllers/signup");
const { updateAccount } = require("../Controllers/updateDetails");
const { getUserbyId } = require("../Controllers/userDetails");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/update").post(getUserbyId, updateAccount);
module.exports = router;
