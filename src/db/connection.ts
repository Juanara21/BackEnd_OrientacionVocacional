import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
const DB_PASSWORD = process.env.DB_PASSWORD || 'Juanaraujo21';
const DB_NAME = process.env.DB_NAME || 'bd_orientacion';
const DB_USER = process.env.DB_USER || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DATABASE_UR = process.env.DATABASE_URL || 'mysql://root:uHZQDJIQ5aNRtPdPgZAP@containers-us-west-134.railway.app:6143/railway';
console.log(DB_HOST,DB_NAME,DB_PASSWORD,DB_NAME )

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
