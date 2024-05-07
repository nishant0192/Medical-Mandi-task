const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authContoller');

const router = express.Router();

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);


module.exports = router;
