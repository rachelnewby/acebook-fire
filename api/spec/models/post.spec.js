var mongoose = require("mongoose");
var Post = require('../../models/post');
const seedPosts = require('../seeds/postSeeds.js');

require("../mongodb_helper");

describe("Post model", () => {
  beforeEach(async () => {
    await seedDB();
  });

  const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
    await Post.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
    await Post.insertMany(seedPosts); // It seeds the seedUsers data (required at the top of this file) into the collection 
  }

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect.arrayContaining([
        expect.objectContaining({
          content: 'acebook is great'
        })
      ]);
      expect.arrayContaining([
        expect.objectContaining({
          content: 'i miss facebook'
        })
      ]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({
      content: 'this is a post',
      user_id: new mongoose.Types.ObjectId(),
      date_created: new Date(),
      likes: []
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect.arrayContaining([
          expect.objectContaining(post)
        ]);
        done();
      });
    });
  });
});
