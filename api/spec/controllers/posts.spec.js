const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const seedPosts = require('../seeds/postSeeds.js');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;


describe("/posts", () => {
  beforeAll( async () => {
    const user = new User({firstName: "Billy", surname: "Bob", email: "test@test.com", password: "12345678"});
    await user.save();

    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
    await Post.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
    //console.log(seedPosts);
    await Post.insertMany(seedPosts); // It seeds the seedUsers data (required at the top of this file) into the collection 
  }

  beforeEach( async () => {
    await seedDB();
  })

  
  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "howdy!",
        date_created: new Date(),
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 0,
        token: token });
      expect(response.status).toEqual(201);
    });
  
    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "howdy!",
        date_created: new Date(),
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 0,
        token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].content).toEqual("howdy!");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "howdy!",
        date_created: new Date(),
        user_id: 2,
        likes: 0,
        token: token })
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ content: "howdy!",
        date_created: new Date(),
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 0 });
      expect(response.status).toEqual(401);
    });
  
    test("a post is not created", async () => {
      await request(app)
        .post("/posts")
        .send({ content: "howdy!",
        date_created: new Date(),
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 0 });
      let posts = await Post.find();
      expect(posts.length).toEqual(5);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {      
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let messages = response.body.posts.map((post) => ( post.content ));
      expect(messages).toEqual(["acebook is great", "i miss facebook", "anyone recognise this person robbed newsagents sunday pls dm", "Josh has no strong views relating to Susan Sarandon", "i hate my baby daddy"]);
    })

    test("the response code is 200", async () => {
      let post1 = new Post({
        content: "acebook is great", 
        date_created: new Date (), 
        user_id: '63ecb95f56d1cb1f1aa347a5', 
        likes: 1
      });
      let post2 = new Post({
        content: "i miss facebook", 
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5', 
        likes: 5
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let post1 = new Post({
        content: "acebook is great",
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 1
      });
      let post2 = new Post({
        content: "i miss facebook", 
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5', 
        likes: 5
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
  })

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({
        content: "acebook is great",
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 1
      });
      let post2 = new Post({
        content: "i miss facebook", 
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5', 
        likes: 5
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.posts).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let post1 = new Post({
        content: "acebook is great",
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 1});
      let post2 = new Post({
        content: "i miss facebook", 
        date_created: new Date(), 
        user_id: '63ecb9da4134d02102ee1f52', 
        likes: 5
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let post1 = new Post({
        content: "acebook is great",
        date_created: new Date(), 
        user_id: '63ecb95f56d1cb1f1aa347a5',
        likes: 1
      });
      let post2 = new Post({
        content: "i miss facebook", 
        date_created: new Date(), 
        user_id: '63ecb9da4134d02102ee1f52', 
        likes: 5
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.token).toEqual(undefined);
    })
  })

});
