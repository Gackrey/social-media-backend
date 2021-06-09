const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");
const { UserDetails } = require("../models/userDetails.model");
const { Post } = require("../models/posts.model");
const getUserbyId = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Account.findById(decoded.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    req.user = user;
    next();
  } catch {
    res
      .status(400)
      .json({ success: false, message: "could not retrieve user " });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { _id } = req.body;
    const account_det = await Account.findById(_id);
    const user_det = await UserDetails.findOne({ userId: _id });
    const user_post_det = await Post.find({ "owner.userID": _id });
    const { url, bio, profile_pic, following, followers } = user_det;
    res.json({
      _id,
      firstname: account_det.firstname,
      lastname: account_det.lastname,
      email: account_det.email,
      phone: account_det.phone,
      url,
      bio,
      profile_pic,
      following,
      followers,
      posts: user_post_det,
    });
  } catch {
    res
      .status(400)
      .json({ success: false, message: "could not retrieve user " });
  }
};

const addUserDetails = async (req, res) => {
  try {
    const { user } = req;
    const userBody = req.body;
    userBody.userId = user._id;
    const NewUser = UserDetails(userBody);
    const savedUser = await NewUser.save();
    const { profile_pic } = savedUser;
    res.json({ success: true, profile_pic });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add users",
      errorMessage: err.message,
    });
  }
};

const showAllUsers = async (req, res) => {
  try {
    const accounts = await Account.find();
    const users = await UserDetails.find();
    const count = accounts.length;
    let results = [];
    for (let i = 0; i < count; i++) {
      const { _id, firstname, lastname, email, phone } = accounts[i];
      const { url, bio, profile_pic, following, followers } = users[i];
      const single_user = {
        _id,
        firstname,
        lastname,
        email,
        phone,
        url,
        bio,
        profile_pic,
        following,
        followers,
      };
      results.push(single_user);
    }
    res.json({ success: true, results });
  } catch {
    res
      .status(400)
      .json({ success: false, message: "could not retrieve user " });
  }
};

module.exports = { getUserbyId, getUserDetails, addUserDetails, showAllUsers };
