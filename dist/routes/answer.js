"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answer_1 = require("../controllers/answer");
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", answer_1.newAnswer);
// Ruta para actualizar una pregunta existente
router.put("/:id", answer_1.updateAnswer);
// Ruta para eliminar una pregunta existente
router.delete("/:id", answer_1.deleteAnswer);
// Ruta para obtener todas las preguntas
router.get("/", answer_1.getAllAnswer);
exports.default = router;
