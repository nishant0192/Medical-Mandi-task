const pool = require('../config/db');

const User = {
  async createUser(username, email, password) {
    const [rows, fields] = await pool.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return rows.insertId;
  },
  async getUserByEmail(email) {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
};

module.exports = User;
