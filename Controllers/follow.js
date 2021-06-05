const { UserDetails } = require("../models/userDetails.model");
const addFollowing = async (req, res) => {
  try {
    const { user } = req;
    const to_add = req.body;
    const user_det = await UserDetails.findOne({ userId: user._id });
    let updatedFollowing = user_det.following;
    updatedFollowing.push(to_add._id);
    const user_to_follow_det = await UserDetails.findOne({
      userId: to_add._id,
    });
    let updatedFollower = user_to_follow_det.followers;
    updatedFollower.push(user._id);
    await UserDetails.updateOne(
      { userId: user._id },
      { following: updatedFollowing }
    );
    await UserDetails.updateOne(
      { userId: to_add._id },
      { followers: updatedFollower }
    );
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, error: "Cannot follow users" });
  }
};

const removeFollowing = async (req, res) => {
  try {
    const { user } = req;
    const to_add = req.body;
    const user_det = await UserDetails.findOne({ userId: user._id });
    let updatedFollowing = user_det.following;
    updatedFollowing = updatedFollowing.filter(
      (s_user) => s_user.toString() !== to_add._id
    );
    const user_to_follow_det = await UserDetails.findOne({
      userId: to_add._id,
    });
    let updatedFollower = user_to_follow_det.followers;
    updatedFollower = updatedFollower.filter(
      (s_user) => s_user.toString() !== user._id.toString()
    );

    await UserDetails.updateOne(
      { userId: user._id },
      { following: updatedFollowing }
    );
    await UserDetails.updateOne(
      { userId: to_add._id },
      { followers: updatedFollower }
    );
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, error: "Cannot unfollow users" });
  }
};

module.exports = { addFollowing, removeFollowing };
