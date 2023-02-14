const Comment = require('../models/comment');
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
    Add: (req, res) => {
        const comment = new Comment(req.body);
        comment.save(async (err) => {
            if (err) {
                throw err;
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201),json({message: 'OK', token: token})
        })
    }
}

module.exports = CommentsController;