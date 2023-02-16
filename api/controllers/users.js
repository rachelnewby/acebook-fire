const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const JWT = require('jsonwebtoken');


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

  Update: async (req, res) => {
    console.log('req.user_id:', req.user_id)
    console.log('req.session:', req.session)
    const pfid = req.body.pfid
    const token = req.body.token
    
    console.log('req.body.token:', req.body.token)
    const currentUserId = JWT.verify(token, 'SUPER_SECRET')
    // let id = currentUserId.user_id
    console.log(currentUserId.user_id)
    console.log("this is the path we want")
    // console.log(id)
    

  }
};

module.exports = UsersController;
