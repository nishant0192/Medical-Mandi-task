const pool = require('../config/db');

const Post = {
  async createPost(title, content, authorId) {
    const [rows, fields] = await pool.execute('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)', [title, content, authorId]);
    return rows.insertId;
  },

  async getPostById(postId) {
    const [rows, fields] = await pool.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    return rows[0];
  },

  async updatePost(postId, title, content) {
    await pool.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
  },

  async deletePost(postId) {
    await pool.execute('DELETE FROM posts WHERE id = ?', [postId]);
  }
};

module.exports = Post;
