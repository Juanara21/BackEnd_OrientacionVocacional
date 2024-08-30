"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primer_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundo_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipo_identificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    identificacion: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    sexo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
});
