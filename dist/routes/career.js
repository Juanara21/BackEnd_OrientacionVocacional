"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const career_1 = require("../controllers/career");
const router = (0, express_1.Router)();
// Ruta para crear una nueva pregunta
router.post("/", career_1.newCareer);
// Ruta para actualizar una pregunta existente
router.put("/:id", career_1.updateCareer);
// Ruta para eliminar una pregunta existente
router.delete("/:id", career_1.deleteCareer);
// Ruta para obtener todas las preguntas
router.get("/", career_1.getAllCareer);
exports.default = router;
