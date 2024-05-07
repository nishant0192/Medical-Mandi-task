const express = require('express');
const { body, param } = require('express-validator');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/:postId/comments', [
  param('postId').isInt().withMessage('Post ID must be an integer'),
  body('content').notEmpty().withMessage('Content cannot be empty')
], commentController.createComment);

router.get('/:id', [
  param('id').isInt().withMessage('Comment ID must be an integer')
], commentController.getComment);

router.put('/:id', [
  param('id').isInt().withMessage('Comment ID must be an integer'),
  body('content').notEmpty().withMessage('Content cannot be empty')
], commentController.updateComment);

router.delete('/:id', [
  param('id').isInt().withMessage('Comment ID must be an integer')
], commentController.deleteComment);

module.exports = router;
