const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.Like);
router.delete("/:id", PostsController.Delete);
router.put("/:id", PostsController.Update);



module.exports = router;
