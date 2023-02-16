const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const Comment = require('../../models/comment');
const secret = process.env.JWT_SECRET;


let token;

describe("/comments", () => {
    beforeAll(async () => {
      const user = new User({
        firstName: "Billy",
        surname: "Bob",
        email: "test@test.com",
        password: "12345678"
      });
  
      user_id = user._id;
      await user.save();
  
      token = JWT.sign(
        {
          user_id: user.id,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - 5 * 60,
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + 10 * 60
        },
        secret
      );
    });
  
    beforeEach(async () => {
      // We are assigning a function to the variable seedDB which is asynchronous
      await Post.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
      await Comment.deleteMany({});
      const post = new Post({
        content: "I love acebook",
        user_id,
        likes: 2,
        date_created: new Date()
      });
      post_id = post._id;
      await post.save();
     
    });
  
    describe("POST, when token is provided", () => {
      test("the response code is 201", async () => {
        const response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({
            post_id: post_id,
            comment: "nice"
          });
        expect(response.status).toEqual(201);
      });
      test("the comment is added", async () => {
        const response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({
            post_id: post_id,
            comment: "nice"
          });
          let comments = await Comment.find()
        expect(comments.length).toEqual(1);
        expect(comments[0].comment).toEqual("nice")
      });
    });
    
    describe('POST, when token is not provided', () => {
      test('the response is 401', async () => {
        const response = await request(app)
        .post("/comments")
        .send({
          post_id: post_id,
          comment: "nice"
        });
      expect(response.status).toEqual(401);
      })
      test("returns no comments", async () => {
        const response = await request(app)
        .post("/comments")
        .send({
          post_id: post_id,
          comment: "nice"
        });
      expect(response.body.comment).toEqual(undefined);
    })
  }) 
});
    
 
  
