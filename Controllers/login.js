const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");
const login = async (req, res) => {
  const user = req.body;
  try {
    const userdata = await Account.findOne({ email: user.email }).exec();
    userdata.comparePassword(user.password, (error, match) => {
      if (match) {
        const token = jwt.sign(
          { id: userdata._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
          success: true,
          id: token,
          firstname: userdata.firstname,
          lastname: userdata.lastname,
          email: userdata.email,
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Password didn't match" });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to find user",
      errorMessage: err.message,
    });
  }
};

module.exports = { login };
