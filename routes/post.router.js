const express = require("express");
const router = express.Router();

const { getUserbyId } = require("../Controllers/userDetails");
const {
  createPost,
  deletePost,
  editPost,
  showAll,
} = require("../Controllers/Posts");

const { addLike, removeLike } = require("../Controllers/like");
const { addComment, deleteComment } = require("../Controllers/comment");

router
  .route("/create-or-delete")
  .post(getUserbyId, createPost)
  .delete(getUserbyId, deletePost);

router.route("/update").post(getUserbyId, editPost);
router.route("/show-all").get(showAll);

router
  .route("/liked")
  .post(getUserbyId, addLike)
  .delete(getUserbyId, removeLike);

router
  .route("/comment")
  .post(getUserbyId, addComment)
  .delete(getUserbyId, deleteComment);

module.exports = router;
