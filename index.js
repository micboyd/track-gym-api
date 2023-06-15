import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';

import authRoute from './routes/userAuthentication.js';

const app = express();
dotenv.config();

// Headers
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:4200'];

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

// Parser
app.use(express.json());

// Database
const uri = process.env.DB_CONNECT;

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(x => {
    console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
}).catch(err => {
    console.error("Error connecting to mongo", err);
});

app.use('/api/users', authRoute);

// Server
app.listen(process.env.PORT || 4200, () => {
    console.log('Server running');
});