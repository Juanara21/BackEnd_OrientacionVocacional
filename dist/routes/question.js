"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_1 = require("../controllers/question");
const valide_token_1 = __importDefault(require("./valide_token"));
const verify_rol_1 = __importDefault(require("./verify_rol"));
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", valide_token_1.default, (0, verify_rol_1.default)("admin"), question_1.newQuestion);
// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token_1.default, (0, verify_rol_1.default)("admin"), question_1.updateQuestion);
// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token_1.default, (0, verify_rol_1.default)("admin"), question_1.deleteQuestion);
// Ruta para obtener todas las preguntas
router.get("/", valide_token_1.default, question_1.getAllQuestions);
exports.default = router;
