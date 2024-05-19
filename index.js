import express from 'express';
import dotenv from 'dotenv';

import sequelize from './config/dbConfig.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});