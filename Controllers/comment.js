const { Post } = require("../models/posts.model");
const addComment = async (req, res) => {
  try {
    const { user } = req;
    let { _id, comments, comment } = req.body;
    comments.push({ message: comment, by: user._id });
    await Post.findByIdAndUpdate(_id, { comments: comments });
    res.json({ success: true });
  } catch {
    res.status(400).json({ success: false, error: "Cannot follow users" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { user } = req;
    let { _id, comment_id, owner, comments } = req.body;
    if (user._id.toString() === owner.toString()) {
      comments = comments.filter(
        (s_user) => s_user._id.toString() !== comment_id.toString()
      );
      await Post.findByIdAndUpdate(_id, { comments: comments });
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Not authorized to delete" });
    }
  } catch {
    res.status(400).json({ success: false, error: "Cannot delete comments" });
  }
};

module.exports = { addComment, deleteComment };
