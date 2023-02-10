const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const { post } = require("../routes/posts");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Delete: async (req, res) => {
    const postId = req.params.id;
    try {
      await Post.deleteOne({ _id: postId });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(200)
        .json({ message: 'Post deleted successfully', token: token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  Update: async (req, res) => {
    const postId = req.params.id;
    try {
      const updatePost = await Post.findOneAndUpdate({ _id: postId}, req.body, {
        new: true
      });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(200)
        .json({message: "Post updated successfully", post: updatePost, token: token})
    } catch (error) {
      res.status(500).json({ error: err.message});
    }
  }
  };

module.exports = PostsController;
