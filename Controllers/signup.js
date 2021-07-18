const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");
const signup = async (req, res) => {
  try {
    const user = req.body;
    const NewUser = Account(user);
    const savedUser = await NewUser.save();
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      id: token,
      firstname: savedUser.firstname,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add users",
      errorMessage: err.message,
    });
  }
};

module.exports = { signup };
