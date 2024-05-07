const { validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const postId = await Post.createPost(title, content, userId);

    res.status(201).json({ postId });
  } catch (error) {
    console.error('Error in create post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error in get post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Post.updatePost(postId, title, content);

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error in update post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.deletePost(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in delete post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
