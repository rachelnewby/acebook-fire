const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Index: (req, res) => {
    User.find({}, async (err, users) => {
      if (err) {
        console.log('if error')
        return res.status(400).json({error: err})
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id) // Added await
      res.status(200).json({ users: users, token: token });
    });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        // if account already exists
        res.status(400).json({message: 'Bad request'})
      } else {
        // account does not already exist
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};

module.exports = UsersController;
