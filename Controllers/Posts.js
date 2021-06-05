const { Post } = require("../models/posts.model");
const createPost = async (req, res) => {
  try {
    const { user } = req;
    const userPost = req.body;
    userPost.owner = user._id;
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
    if (user._id.toString() === delPost.owner.toString()) {
      await Post.findByIdAndDelete(delPost._id);
      res.json({ success: true });
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
    if (user._id.toString() === editPost.owner.toString()) {
      await Post.findByIdAndUpdate(editPost._id, editPost);
      res.json({ success: true });
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

const showUserPosts = async (req, res) => {
  try {
    const { user } = req;
    const allUserPosts = await Post.find({ owner: user._id });
    res.json({ success: true, allUserPosts });
  } catch {
    res.status(400).json({
      success: false,
      message: "Unable to user's posts",
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
module.exports = { createPost, deletePost, editPost, showUserPosts, showAll };
