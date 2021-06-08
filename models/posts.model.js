const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    owner: {
      name: String,
      profile_pic: String,
      userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    liked_by: [
      {
        name: String,
        profile_pic: String,
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        message: String,
        name: String,
        profile_pic: String,
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);
module.exports = { Post };
