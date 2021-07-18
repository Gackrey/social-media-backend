const { Post } = require("../models/posts.model");
const { UserDetails } = require("../models/userDetails.model");
const addLike = async (req, res) => {
  try {
    const { user } = req;
    const post = req.body;
    const name = `${user.firstname} ${user.lastname}`;
    const user_det = await UserDetails.findOne({ userId: user._id });
    let updatedLiked = post.liked_by;
    updatedLiked.push({
      name,
      profile_pic: user_det.profile_pic,
      userID: user._id,
    });
    await Post.findByIdAndUpdate(post._id, { liked_by: updatedLiked });
    res.json({ success: true, _id: post._id, liked_by: updatedLiked });
  } catch {
    res.status(400).json({ success: false, error: "Cannot add like to post" });
  }
};
const removeLike = async (req, res) => {
  try {
    const { user } = req;
    let { liked_by, _id } = req.body;
    liked_by = liked_by.filter(
      (liked_val) => liked_val.userID.toString() !== user._id.toString()
    );
    await Post.findByIdAndUpdate(_id, { liked_by: liked_by });
    res.json({ success: true, _id, liked_by });
  } catch {
    res.status(400).json({ success: false, error: "Unable dislike to post" });
  }
};

module.exports = { addLike, removeLike };
