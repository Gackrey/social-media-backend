const jwt = require("jsonwebtoken");
const { Account } = require("../models/account.model");
const login = async (req, res) => {
  const user = req.body;
  try {
    await Account.findOne(user, function (err, docs) {
      if (docs === null) {
        res
          .status(500)
          .json({ success: false, message: "Unable to find user" });
      } else {
        const token = jwt.sign(
          { id: docs._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ success: true, id: token});
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
