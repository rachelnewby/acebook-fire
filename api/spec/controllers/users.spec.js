const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const JWT = require("jsonwebtoken"); 
const secret = process.env.JWT_SECRET; 
const seedUsers = require('../seeds/userSeeds.js')

let token;

describe("/users", () => {
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
    await User.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
    await User.insertMany(seedUsers); // It seeds the seedUsers data (required at the top of this file) into the collection 
  }
  
  beforeEach( async () => {
    await seedDB() // The seedDB function (defined above) is called
  })

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", firstName: "Adam", surname: "Hoar"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", firstName: "Adam", surname: "Hoar"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(6)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(6)
    });
  })

  describe("POST, when first name is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", email: "something@someone.com", surname: "Billy"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234", email: "something@someone.com", surname: "Billy"})
      let users = await User.find()
      expect(users.length).toEqual(6)
    });
  })

  describe("POST, when last name is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", email: "something@someone.com", firstName: "Billy"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234", email: "something@someone.com", firstName: "Billy"})
      let users = await User.find()
      expect(users.length).toEqual(6)
    });
  })
  
  describe("GET, when token is present", () => {
    test("returns every user in the collection", async () => {
      let response = await request(app)
        .get("/users") 
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      console.log(response.body)
      let acebookUsers = response.body.users.map((user) => (user.firstName));
      console.log(acebookUsers)
      expect(acebookUsers.length).toEqual(6)
    })
  })
})