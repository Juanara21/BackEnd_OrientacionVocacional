"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_1 = require("../controllers/question");
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", question_1.newQuestion);
// Ruta para actualizar una pregunta existente
router.put("/:id", question_1.updateQuestion);
// Ruta para eliminar una pregunta existente
router.delete("/:id", question_1.deleteQuestion);
// Ruta para obtener todas las preguntas
router.get("/", question_1.getAllQuestions);
exports.default = router;
