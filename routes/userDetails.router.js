const express = require("express");
const router = express.Router();
const {
  getUserbyId,
  getUserDetails,
  showAllUsers,
  addUserDetails,
} = require("../Controllers/userDetails");
const { addFollowing, removeFollowing } = require("../Controllers/follow");
const { updateUser } = require("../Controllers/updateDetails");

router.route("/get-user-details").get(getUserDetails);
router.route("/show-all-users").get(showAllUsers);
router.route("/add-user-details").post(getUserbyId, addUserDetails);
router.route("/updateUser").post(getUserbyId,updateUser)
router
  .route("/following")
  .post(getUserbyId, addFollowing)
  .delete(getUserbyId, removeFollowing);

module.exports = router;
