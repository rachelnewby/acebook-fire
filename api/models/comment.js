const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const CommentSchema = new mongoose.Schema({
    user_id: {type: ObjectId, required: true, ref: 'User'},
    post_id: {type: ObjectId, required: true, ref: 'Post'},
    comment: {type: String, required: true }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;