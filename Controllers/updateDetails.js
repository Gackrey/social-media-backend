const { extend } = require("lodash");
const updateUser = async (req, res) => {
  try {
    let { user } = req;
    const newdata = req.body;
    const updatedUser = {
      username: newdata.username,
      email: newdata.email,
      password: newdata.password,
    };
    user = extend(user, updatedUser);
    await user.save();
    res.json({
      success: true,
      id: user._id,
      icon: user.username[0],
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Unable to update user details" });
  }
};

module.exports = { updateUser };
