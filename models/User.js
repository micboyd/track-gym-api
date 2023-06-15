import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    firstName: String,
    surname: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: Boolean
});

const user = mongoose.model('User', userSchema);

export default user;





