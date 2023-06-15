import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User  from "../models/User.js";

const router = express.Router();

// EP: Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Email or password is incorrect');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        return res.status(400).send('Email or password is incorrect');
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.status(200).header('auth-token', token).json(user);
});

// EP: Register
router.post('/register', async (req, res) => {

    // Check if user already exists
    const emailExists = await User.findOne({
        email: req.body.email
    })

    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        surname: req.body.surname,
        isAdmin: req.body.isAdmin,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/all-users', async (req, res) => {
    let allUsers = await User.find();
    return res.json(allUsers);
});

export default router;