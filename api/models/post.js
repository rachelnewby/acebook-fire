const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  userID: { type: ObjectId, required: true },
  likes: [{ type: ObjectId, required: true }]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;