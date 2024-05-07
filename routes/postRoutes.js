const express = require('express');
const { body, param } = require('express-validator');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('content').notEmpty().withMessage('Content cannot be empty')
], postController.createPost);

router.get('/:id', [
  param('id').isInt().withMessage('Post ID must be an integer')
], postController.getPost);

router.put('/:id', [
  param('id').isInt().withMessage('Post ID must be an integer'),
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('content').notEmpty().withMessage('Content cannot be empty')
], postController.updatePost);

router.delete('/:id', [
  param('id').isInt().withMessage('Post ID must be an integer')
], postController.deletePost);

module.exports = router;
