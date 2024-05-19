import { createUser, getUserByEmail } from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.json(user);
    }
    catch (err) {
        if (process.env.PROD) {
            res.status(500).send('Server Error');
        }
        else {
            res.status(500).send(err);
        }
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({  email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(400).send('Username or password is incorrect.');
        }
    }
    catch (err) {
        if (process.env.PROD) {
            res.status(500).send('Server Error');
        }
        else {
            res.status(500).send(err);
        }
    }
};