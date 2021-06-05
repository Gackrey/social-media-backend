const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");
const { UserDetails } = require("../models/userDetails.model");
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
    const { user } = req;
    const { _id, firstname, lastname, email, phone } = user;
    user.__v = undefined;
    const user_det = await UserDetails.findOne({ userId: user._id });
    const { url, bio, profile_pic, following, followers } = user_det;
    console.log(user_det);
    res.json({
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
    res.json({ success: true, savedUser });
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
      const { _id,firstname, lastname, email, phone } = accounts[i];
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
