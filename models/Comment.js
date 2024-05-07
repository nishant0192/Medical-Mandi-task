const pool = require('../config/db');

const Comment = {
  async createComment(content, postId, userId) {
    const [rows, fields] = await pool.execute('INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)', [content, postId, userId]);
    return rows.insertId;
  },

  async getCommentById(commentId) {
    const [rows, fields] = await pool.execute('SELECT * FROM comments WHERE id = ?', [commentId]);
    return rows[0];
  },

  async updateComment(commentId, content) {
    await pool.execute('UPDATE comments SET content = ? WHERE id = ?', [content, commentId]);
  },

  async deleteComment(commentId) {
    await pool.execute('DELETE FROM comments WHERE id = ?', [commentId]);
  }
};

module.exports = Comment;
