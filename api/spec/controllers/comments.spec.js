const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const seedPosts = require('../seeds/postSeeds.js');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const Comment = require('../../models/comment');
const seedComments = require('../seeds/commentSeeds.js');
const secret = process.env.JWT_SECRET;

let token;

describe("/comments", () => {
    beforeAll( async () =>{
        const user = new User({firstName: "Billy", surname: "Bob", email: "test@test.com", password: "12345678"});
        const post = new Post({content: "acebook is great",
        date_created: new Date('<2010-03-12>'),
        user_id: 1, //new ObjectId('63ea4c50c5b85f680127153c'),
        likes: 1});
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
            await Comment.deleteMany({});
            console.log(seedPosts);
            await Post.insertMany(seedPosts); // It seeds the seedUsers data (required at the top of this file) into the collection 
            await Comment.insertMany(seedComments);
          }
        
    beforeEach( async () => {
        await seedDB();
    })

    describe("POST, when comment is provided", () => {
        test("the response code is 201", async () => {
            let response = await request(app)
            .post("/comments")
            .send({user_id: 1,
            post_id: 1,
            comment: "hello"});
        expect (response.status).toEqual(201);
    });
  })
});