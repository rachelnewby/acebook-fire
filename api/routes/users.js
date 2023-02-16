const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");


const UsersController = require("../controllers/users");

const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

router.get("/", tokenChecker, UsersController.Index);
router.post("/", UsersController.Create);
router.put("/", tokenChecker, UsersController.Update); // It is essential that we have tokenChecker here so that we can make sure our token has the user id in it (without this, it doesn't)
router.get("/profile", UsersController.Info);


module.exports = router;
