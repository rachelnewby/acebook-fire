var mongoose = require("mongoose");

const Post = require('../models/post.js');
const seedPosts = require('./seeds/postSeeds.js');


beforeAll(function (done) {
  mongoose.connect("mongodb://0.0.0.0/acebook_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {
    done();
  });
});

const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
  await Post.deleteMany({});
  await Post.insertMany(seedPosts);
}

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
