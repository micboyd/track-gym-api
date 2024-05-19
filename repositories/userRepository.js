import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const createUser = async (user) => {
    const { email, firstName, surname, password, isAdmin } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
        email,
        firstName,
        surname,
        password: hashedPassword,
        isAdmin
    });
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};