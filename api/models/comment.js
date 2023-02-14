const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const CommentSchema = new mongoose.Schema({
    user_id: {type: ObjectId, required: true},
    post_id: {type: ObjectId, required: true},
    comment: {type: String, required: true }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;