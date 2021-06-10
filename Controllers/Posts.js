const { Post } = require("../models/posts.model");
const { UserDetails } = require("../models/userDetails.model");
const createPost = async (req, res) => {
  try {
    const { user } = req;
    const userPost = req.body;
    const name = `${user.firstname} ${user.lastname}`;
    const user_det = await UserDetails.findOne({ userId: user._id });
    userPost.owner = {
      name,
      profile_pic: user_det.profile_pic,
      userID: user._id,
    };
    const NewPost = Post(userPost);
    const savedPost = await NewPost.save();
    res.json({ success: true, savedPost });
  } catch {
    res.status(400).json({
      success: false,
      message: "Unable to create post",
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const { user } = req;
    const delPost = req.body;
    if (user._id.toString() === delPost.owner.userID.toString()) {
      await Post.findByIdAndDelete(delPost._id);
      res.json({ success: true, post_id: delPost._id });
    } else {
      res.status(403).json({ success: false });
    }
  } catch {
    res.status(400).json({
      success: false,
      message: "Unable to delete post",
    });
  }
};
const editPost = async (req, res) => {
  try {
    const { user } = req;
    const editPost = req.body;
    if (user._id.toString() === editPost.owner.userID.toString()) {
      await Post.findByIdAndUpdate(editPost._id, editPost);
      res.json({ success: true, post_id: editPost._id, updatedPost: editPost });
    } else {
      res.status(403).json({ success: false });
    }
  } catch {
    res.status(400).json({
      success: false,
      message: "Unable to edit post",
    });
  }
};
const showAll = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json({ success: true, allPosts });
  } catch {
    res.status(400).json({
      success: false,
      message: "Unable to show all posts",
    });
  }
};
module.exports = { createPost, deletePost, editPost, showAll };
