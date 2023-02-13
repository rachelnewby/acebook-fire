const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const seedUsers = require('../seeds/userSeeds.js')

describe("User model", () => {

  const seedDB = async () => { // We are assigning a function to the variable seedDB which is asynchronous 
    await User.deleteMany({}); // It deletes the existing contents from the database (User is the schema for one user)
    await User.insertMany(seedUsers); // It seeds the seedUsers data (required at the top of this file) into the collection 
  }
  
  beforeEach(async () => {
    await seedDB() // The seedDB function (defined above) is called
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",

    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users.length).toEqual(6);
      done();
    });
  });

    // it('can save a user with an array of numbers', async () => {
    //   const user = new User({
    //     email: "someone@example.com",
    //     password: "password",
    //     firstName: "Rachel",
    //     surname: "Newby",
    //     friendsList: [1, 2, 3]
    //   });

    //   await user.save(async (err) => {
    //     expect(err).toBeNull();
  
    //     await User.find((err, users) => {
    //       expect(err).toBeNull();
  
    //       expect(users[0].toJSON()).toMatchObject({
    //         email: "someone@example.com",
    //         password: "password",
    //         firstName: "Rachel",
    //         surname: "Newby",
    //         friendsList: [1, 2, 3]
    //       });
    //   })
    // });
  // })
});