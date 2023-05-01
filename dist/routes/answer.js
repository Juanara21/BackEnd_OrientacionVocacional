"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answer_1 = require("../controllers/answer");
const valide_token_1 = __importDefault(require("./valide_token"));
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", valide_token_1.default, answer_1.newAnswer);
// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token_1.default, answer_1.updateAnswer);
// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token_1.default, answer_1.deleteAnswer);
// Ruta para obtener todas las preguntas
router.get("/", valide_token_1.default, answer_1.getAllAnswer);
exports.default = router;
