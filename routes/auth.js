import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import verifyToken from "../middlewares/authMiddleware.js";

import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        await user.save();

        res.status(201).send('User created successfully');
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }

});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Incorrect password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

// // Protected route
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).send('This is a protected route');
});

export default router;