"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIDUsers = exports.getUnUsers = exports.getUsers = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
    SELECT u.id AS usuario_id, u.primer_nombre, u.primer_apellido, c.career AS  Carrera, SUM(r.valor) AS afinidad
    FROM Users u
    INNER JOIN Answers r ON u.id = r.UserId
    INNER JOIN Questions q ON r.QuestionId = q.id
    INNER JOIN Careers c ON q.CareerId = c.id
    GROUP BY u.id, c.id
    ORDER BY u.id, afinidad DESC;
    `;
        const users = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
        res.json(users);
    }
    catch (error) {
        // Maneja el error de consulta
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de usuarios.' });
    }
});
exports.getUsers = getUsers;
const getUnUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
    SELECT t.id_usuario, t.primer_nombre, u.primer_apellido, t.carrera, t.afinidad
    FROM (
      SELECT u.id as id_usuario, u.primer_nombre, c.career as carrera, SUM(a.valor) as afinidad
      FROM users u
      INNER JOIN answers a ON u.id = a.UserId
      INNER JOIN questions q ON a.QuestionId = q.id
      INNER JOIN careers c ON q.CareerId = c.id
      GROUP BY u.id, c.id
    ) AS t
    INNER JOIN (
      SELECT usuario_id, MAX(afinidad) AS max_afinidad
      FROM (
        SELECT u.id as usuario_id, c.id as carrera_id, SUM(a.valor) as afinidad
        FROM users u
        INNER JOIN answers a ON u.id = a.UserId
        INNER JOIN questions q ON a.QuestionId = q.id
        INNER JOIN careers c ON q.CareerId = c.id
        GROUP BY u.id, c.id
      ) AS t1
      GROUP BY usuario_id
    ) AS t2 ON t.id_usuario = t2.usuario_id AND t.afinidad = t2.max_afinidad
    INNER JOIN users u ON t.id_usuario = u.id
    ORDER BY t.id_usuario;
    `;
        const users = yield connection_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
        res.json(users);
    }
    catch (error) {
        // Maneja el error de consulta
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de usuarios.' });
    }
});
exports.getUnUsers = getUnUsers;
const getIDUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
    SELECT t.id_usuario, t.primer_nombre, u.primer_apellido, t.carrera, t.afinidad
    FROM (
      SELECT u.id as id_usuario, u.primer_nombre, c.career as carrera, SUM(a.valor) as afinidad
      FROM users u
      INNER JOIN answers a ON u.id = a.UserId
      INNER JOIN questions q ON a.QuestionId = q.id
      INNER JOIN careers c ON q.CareerId = c.id
      WHERE u.id = :userId  -- Aquí se agrega la condición para el ID de usuario
      GROUP BY u.id, c.id
    ) AS t
    INNER JOIN (
      SELECT usuario_id, MAX(afinidad) AS max_afinidad
      FROM (
        SELECT u.id as usuario_id, c.id as carrera_id, SUM(a.valor) as afinidad
        FROM users u
        INNER JOIN answers a ON u.id = a.UserId
        INNER JOIN questions q ON a.QuestionId = q.id
        INNER JOIN careers c ON q.CareerId = c.id
        GROUP BY u.id, c.id
      ) AS t1
      GROUP BY usuario_id
    ) AS t2 ON t.id_usuario = t2.usuario_id AND t.afinidad = t2.max_afinidad
    INNER JOIN users u ON t.id_usuario = u.id
    ORDER BY t.id_usuario;
    `;
        const users = yield connection_1.default.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { userId: id } // Reemplazar :userId con el valor del ID recibido
        });
        // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
        res.json(users);
    }
    catch (error) {
        // Maneja el error de consulta
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de usuarios.' });
    }
});
exports.getIDUsers = getIDUsers;
