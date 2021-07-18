const { Account } = require("../models/account.model");
const { UserDetails } = require("../models/userDetails.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const updateAccount = async (req, res) => {
  try {
    const { user } = req;
    let newDetails = req.body;
    if (newDetails.newpassword && newDetails.oldpassword) {
      const userdata = await Account.findById(user._id);
      userdata.comparePassword(newDetails.oldpassword, (error, match) => {
        if (match) {
          newDetails.password = bcrypt.hashSync(newDetails.newpassword, 10);
          (async function () {
            await Account.updateOne({ _id: user._id }, newDetails);
            const token = jwt.sign(
              { id: user._id },
              process.env.ACCESS_TOKEN_SECRET
            );
            res.json({
              success: true,
              id: token,
              firstname: newDetails.firstname,
              lastname: newDetails.lastname,
              email: newDetails.email,
            });
          })();
        } else {
          res
            .status(500)
            .json({ success: false, message: "Password didn't match" });
        }
      });
    } else {
      (async function () {
        await Account.findByIdAndUpdate(user._id, newDetails);
        const token = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
          success: true,
          id: token,
          firstname: newDetails.firstname,
          lastname: newDetails.lastname,
          email: newDetails.email,
        });
      })();
    }
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
    res.json({ success: true, profile_pic: newDetails.profile_pic });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to update user details" });
  }
};

module.exports = { updateAccount, updateUser };
