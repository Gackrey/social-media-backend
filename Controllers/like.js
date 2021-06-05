const { Post } = require("../models/posts.model");
const addLike = async (req, res) => {
  try {
    const { user } = req;
    const post = req.body;
    let updatedLiked = post.liked_by;
    updatedLiked.push(user._id);
    await Post.findByIdAndUpdate(post._id, { liked_by: updatedLiked });
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, error: "Cannot add like to post" });
  }
};
const removeLike = async (req, res) => {
  try {
    const { user } = req;
    const post = req.body;
    let updatedLiked = post.liked_by;
    updatedLiked = updatedLiked.filter(
      (s_user) => s_user.toString() !== user._id
    );
    await Post.findByIdAndUpdate(post._id, { liked_by: updatedLiked });
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, error: "Cannot add like to post" });
  }
};

module.exports = { addLike, removeLike };
