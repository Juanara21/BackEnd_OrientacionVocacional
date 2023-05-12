"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRole = (role) => {
    return (req, res, next) => {
        const headerToken = req.headers['authorization'];
        if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
            try {
                const bearerToken = headerToken.slice(7);
                const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'admin');
                if (decodedToken.rol === role) {
                    next();
                }
                else {
                    res.status(401).json({
                        msg: 'No tiene permiso para realizar esta acción'
                    });
                }
            }
            catch (error) {
                res.status(401).json({
                    msg: 'Token no válido'
                });
            }
        }
    };
};
exports.default = verifyRole;
