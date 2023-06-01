"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB_PASSWORD = process.env.DB_PASSWORD || 'Juanaraujo21';
const DB_NAME = process.env.DB_NAME || 'bd_orientacion';
const DB_USER = process.env.DB_USER || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});
exports.default = sequelize;
