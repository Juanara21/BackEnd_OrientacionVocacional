"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const career_1 = require("../controllers/career");
const valide_token_1 = __importDefault(require("./valide_token"));
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", valide_token_1.default, career_1.newCareer);
// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token_1.default, career_1.updateCareer);
// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token_1.default, career_1.deleteCareer);
// Ruta para obtener todas las preguntas
router.get("/", valide_token_1.default, career_1.getAllCareer);
exports.default = router;
