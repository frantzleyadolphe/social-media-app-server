import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      String,
      required: true,
    },
    firstName: {
      String,
      required: true,
    },
    lastName: {
      String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
