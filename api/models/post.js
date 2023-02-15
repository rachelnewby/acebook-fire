const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date_created: { type: Date, required: true },
  user_id: { type: ObjectId, required: true },
  likes: { type: Number, required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;