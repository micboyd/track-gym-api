import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});