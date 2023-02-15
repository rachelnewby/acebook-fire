const express = require('express');

const router = express.Router();

const CommentsController = require('../controllers/comments');

router.post('/', CommentsController.Add);

module.exports = router;