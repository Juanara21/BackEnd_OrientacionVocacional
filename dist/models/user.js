"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = exports.Question = exports.Career = exports.User = void 0;
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
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user',
    },
});
exports.Career = connection_1.default.define('Career', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    career: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
// Definir el modelo de Preguntas
exports.Question = connection_1.default.define('Question', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
// Definir el modelo de Respuestas
exports.Answer = connection_1.default.define('Answer', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
// Establecer las relaciones entre los modelos
exports.Question.belongsTo(exports.Career);
exports.Career.hasMany(exports.Question);
exports.Question.belongsTo(exports.Career, { foreignKey: 'CareerId' });
exports.Career.hasMany(exports.Question, { foreignKey: 'CareerId' });
exports.Answer.belongsTo(exports.User, { foreignKey: 'UserId' });
exports.User.hasMany(exports.Answer, { foreignKey: 'UserId' });
exports.Answer.belongsTo(exports.Question, { foreignKey: 'QuestionId' });
exports.Question.hasMany(exports.Answer, { foreignKey: 'QuestionId' });
