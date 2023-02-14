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
  Like: async (req, res) => {
    // req.body should contain the id of the post and the id of the user liking it
    // if all okay respond with 200 etc
    // add user.id to the array of likes in the post
    const postId = req.body.post_id;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    // console.log(req.body);
    post.likes.push(userId);
    console.log(post);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
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
    } catch (error) {
      res.status(500).json({ error: err.message});
    }
  }
  };

module.exports = PostsController;
