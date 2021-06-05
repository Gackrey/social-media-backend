const { Account } = require("../models/account.model");
const { UserDetails } = require("../models/userDetails.model");
const jwt = require("jsonwebtoken");
const updateAccount = async (req, res) => {
  try {
    const { user } = req;
    const newDetails = req.body;
    await Account.findByIdAndUpdate(user._id, newDetails);
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ success: true, id: token });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to update user details" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const newDetails = req.body;
    await UserDetails.findOneAndUpdate({ userId: user._id }, newDetails);

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ success: true });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to update user details" });
  }
};

module.exports = { updateAccount, updateUser };
