const express = require('express');

const router = express.Router();

const CommentsController = require('../controllers/comments');

router.post('/', CommentsController.Add);
router.get('/:id', CommentsController.GetByPostId);

module.exports = router;