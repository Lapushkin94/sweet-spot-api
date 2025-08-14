const express = require('express');
const router = express.Router();
const userController = require('../controllers/users-controller');
const { check } = require('express-validator');

router.get('/userList', userController.getUserList);

router.post('/login', userController.login);

router.post(
    '/signup',
    [
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({ min: 6 }),
    ],
    userController.signup);

module.exports = router;