const User = require("../models/user");

const UsersController = {
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
  Info: (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ name: user.firstName, surname: user.surname, token: token });
    });
  },
  
};

module.exports = UsersController;
