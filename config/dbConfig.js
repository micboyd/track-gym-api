import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gymTracker', 'postgres', 'password12', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;