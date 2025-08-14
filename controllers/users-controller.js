const HttpError = require('../modules/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const USERS = [
    { id: 1, name: "Vladi toxic", image: 'avatar1', placesNumber: 1, email: 'email1@gmail.com', password: 'pass1' },
    { id: 2, name: "Fedo weirdo", image: 'avatar2', placesNumber: 2, email: 'email2@gmail.com', password: 'pass2' },
    { id: 3, name: "Olly overthinker", image: 'avatar3', placesNumber: 3, email: 'email3@gmail.com', password: 'pass3' },
    { id: 4, name: "Dmitrii vouno", image: 'avatar4', placesNumber: 4, email: 'email4@gmail.com', password: 'pass4' },
    { id: 5, name: "Kitten", image: 'avatar5', placesNumber: 5, email: 'email5@gmail.com', password: 'pass5' },
    { id: 6, name: "Anasteisha", image: 'avatar6', placesNumber: 57, email: 'email6@gmail.com', password: 'pass6' },
];

const getUserList = (req, res, next) => {
    const userWithNoPassword = USERS.map(({ password, ...rest }) => rest);

    res.json({
        message: 'I am all users',
        allUsers: userWithNoPassword,
    });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const user = USERS.find(usr => usr.email === email);

    if (!user || user.password !== password) {
        return next(new HttpError('Wrong credentials', 403));
    };

    res.json('Logged in!');
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 422));
    };
    
    const { name, email, password } = req.body;
    const exists = USERS.some(user => user.email === email);

    if (exists) {
        return next(new HttpError('Email exists', 422));
    };

    const newUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password,
        placesNumber: 0
    };

    USERS.push(newUser);

    const { password: _, ...userWithNoPassword } = newUser;

    res.status(201).json({
        message: 'User created',
        user: userWithNoPassword
    });
};

exports.getUserList = getUserList;
exports.login = login;
exports.signup = signup;