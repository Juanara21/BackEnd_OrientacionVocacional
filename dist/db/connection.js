"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('bd_orientacion', 'root', 'Juanaraujo21', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
