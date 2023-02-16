const mongoose = require("mongoose");

const Post = require('../../models/post');
const seedPosts = require('../seeds/postSeeds.js');

const User = require('../../models/user');
const seedUsers = require('../seeds/userSeeds.js');

const Comment = require("../../models/comment");
const seedComments = require("../seeds/commentSeeds.js");

require("../mongodb_helper");

describe('Comments model', () => {
    beforeEach(async () => {
        await seedDB();
      });

    const seedDB = async () => {
        await Post.deleteMany({});
        await Post.insertMany(seedPosts);
        await Comment.deleteMany({});
        await Comment.insertMany(seedComments);
    }

    it("contains a comment", () => {
        const comment = new Comment({ comment: "wow" });
        expect(comment.comment).toEqual("wow")
    });

    it('has a user_id ', () => {
        const user_id = new mongoose.Types.ObjectId(); // assign new id for user 
        const comment = new Comment({ user_id: user_id });
        expect(comment.user_id).toEqual(user_id);
    });

    it('has a post_id', () => {
        const post_id = new mongoose.Types.ObjectId(); //assign new id for post 
        const comment = new Comment({ post_id: post_id });
        expect(comment.post_id).toEqual(post_id);
    });

    it('has user id, post id and a comment', () => {
        const user_id = new mongoose.Types.ObjectId();
        const post_id = new mongoose.Types.ObjectId();
        const comment = new Comment({ 
            user_id: user_id,
            post_id: post_id,
            comment: 'acebook'
         });
        expect(comment.user_id).toBe(user_id);
        expect(comment.post_id).toBe(post_id);
        expect(comment.comment).toBe('acebook');
    });
});






