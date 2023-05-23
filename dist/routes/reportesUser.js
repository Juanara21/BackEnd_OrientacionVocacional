"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportesUser_1 = require("../controllers/reportesUser");
const valide_token_1 = __importDefault(require("./valide_token"));
const verify_rol_1 = __importDefault(require("./verify_rol"));
const router = (0, express_1.Router)();
// Ruta para obtener todas las preguntas
router.get("/", valide_token_1.default, (0, verify_rol_1.default)("admin"), reportesUser_1.getUsers);
router.get("/user", valide_token_1.default, (0, verify_rol_1.default)("admin"), reportesUser_1.getUnUsers);
router.get("/:id", valide_token_1.default, reportesUser_1.getIDUsers);
exports.default = router;
