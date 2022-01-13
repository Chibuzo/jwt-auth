const routes = require('express').Router();
const userService = require('../services/userService');
const { handleError } = require('../helpers/errorHandler');
const httpResponse = require('../helpers/httpResponse');


routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { code, message, user } = await userService.login(email, password);
        httpResponse.send(res, code, message, { user });
    } catch (err) {
        handleError(err, res);
    }
});

routes.post('/register', async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        httpResponse.send(res, 201, 'User created', newUser);
    } catch (err) {
        console.log(err)
        handleError(err, res);
    }
});

module.exports = routes;