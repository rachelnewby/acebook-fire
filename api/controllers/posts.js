const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const { post } = require("../routes/posts");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user_id", select: "firstname surname"}).exec(async (err, posts) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Like: async (req, res) => {
    const postId = req.body.post_id;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    post.likes.push(userId);
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      
      const token = await TokenGenerator.jsonwebtoken(userId)
      res.status(201).json({ message: 'OK', token: token });
    })

  },
  Create: (req, res) => {
    console.log(req.user_id);
    const post = new Post({
      content: req.body.content,
      likes: [],
      userID: req.user_id,
      dateCreated: new Date()
    });
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
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  }
  };

module.exports = PostsController;
