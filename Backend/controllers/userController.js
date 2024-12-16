// controllers/userController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { nombre, correo, clave } = req.body;

        // Verificar si el correo ya está registrado
        const existingUser = await userService.findUserByEmail(correo);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Crear nuevo usuario
        const newUser = await userService.createUser({ nombre, correo, clave });
        res.status(201).json({ message: 'Usuario registrado exitosamente.', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { correo, clave } = req.body;

        // Verificar si el usuario existe
        const user = await userService.findUserByEmail(correo);
        if (!user) {
            return res.status(400).json({ message: 'Correo o clave incorrectos.' });
        }

        // Verificar la clave
        const isMatch = await user.comparePassword(clave);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o clave incorrectos.' });
        }

        // Crear un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };


