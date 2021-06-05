const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userDetailSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    profile_pic: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailSchema);
module.exports = { UserDetails };
