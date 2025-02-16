import 'dotenv/config'; // Loads .env contents automatically
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

export default sequelize;
