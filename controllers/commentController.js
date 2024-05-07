const { validationResult } = require('express-validator');
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const commentId = await Comment.createComment(content, postId, userId);

    res.status(201).json({ commentId });
  } catch (error) {
    console.error('Error in create comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.getCommentById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error in get comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Comment.updateComment(commentId, content);

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error in update comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.deleteComment(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error in delete comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
