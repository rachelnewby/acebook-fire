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
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ users: users, token: token, loggedInUser: req.user_id });
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
    const pfid = req.body.pfid
    const bodyToken = req.body.token
    
    const currentUserId = JWT.verify(bodyToken, 'SUPER_SECRET')
    try {
      await User.findOneAndUpdate({_id: currentUserId.user_id}, {$push: {friendsList: pfid}},
      { new: true
      })
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(201)
        .json({message: "Friend request sent", token: token})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  },

  Info: (req, res) => {
    User.findOne({ user: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ firstName: user.firstName,
          surname: user.surname,
          email: user.email, 
          bio: user.bio ,
        friendsList: user.friendsList});
      }
    });

  },
  UpdateBio: async (req, res) => {
    const { bio } = req.body;
    const userId = req.user_id;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { bio: bio },
        { new: true }
      );
      
      const token = await TokenGenerator.jsonwebtoken(userId);
      
      res.status(200).json({
        message: 'Bio updated',
        user: updatedUser,
        token: token
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UsersController;
