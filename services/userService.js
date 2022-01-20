const User = require('../models').User;
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/errorHandler');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new ErrorHandler(404, 'The email or password is incorrect');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new ErrorHandler(400, 'Email and password doesn\'t match');

    const payload = {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
        code: 200,
        user: {
            token,
            id: user._id,
            fullname: user.fullname
        },
        message: 'Logged in'
    };
}

const register = async (user) => {
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) throw new ErrorHandler(400, 'A user already exist with this email');

    const password = await bcrypt.hash(user.password, saltRounds);
    const newUser = await User.create({ ...user, password });
    const newuser = newUser.toJSON();
    delete newuser.password;
    return newuser;
}

const view = async (id, field = 'thumb') => {
    return User.findById(id).select(user_fields[field]).lean();
}

const list = async (criteria = {}) => {
    return User.find(criteria).select(user_fields[field]).lean();
}

module.exports = {
    login,
    register,
    view,
    list,
}