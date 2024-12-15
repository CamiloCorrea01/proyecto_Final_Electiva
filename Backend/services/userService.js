// services/userService.js
const User = require('../models/userModel');

const createUser = async (data) => {
    const { nombre, correo, clave } = data;
    const user = new User({ nombre, correo, clave });
    return await user.save();
};

const findUserByEmail = async (correo) => {
    return await User.findOne({ correo });
};

const findUserById = async (id) => {
    return await User.findById(id);
};

module.exports = { createUser, findUserByEmail, findUserById };
