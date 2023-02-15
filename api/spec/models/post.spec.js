var mongoose = require("mongoose");
var Post = require('../../models/post');
const seedPosts = require('../seeds/postSeeds.js');

require("../mongodb_helper");

describe("Post model", () => {
  beforeEach(async () => {
    // mongoose.connection.collections.posts.drop(() => {
    //   done();
    // });

    await seedDB();
  });

  const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
    await Post.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
    console.log(seedPosts);
    await Post.insertMany(seedPosts); // It seeds the seedUsers data (required at the top of this file) into the collection 
  }

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});
