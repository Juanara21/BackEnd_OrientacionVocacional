import { Sequelize } from "sequelize";

const DB_PASSWORD = process.env.DB_PASSWORD || 'Juanaraujo21';
const DB_NAME = process.env.DB_NAME || 'bd_orientacion';
const DB_USER = process.env.DB_USER || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
console.log(DB_HOST,DB_NAME,DB_PASSWORD,DB_NAME )

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect:'mysql',
    
});

export default sequelize;