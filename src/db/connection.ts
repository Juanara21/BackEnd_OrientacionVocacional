import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  throw new Error('Error al obtener credenciales de la DATABASE');
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    // host: DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
        
      }
    }
  });
  

export default sequelize;
