import { Router } from "express";
import { newQuestion, updateQuestion, deleteQuestion, getAllQuestions } from "../controllers/question"
const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", newQuestion);

// Ruta para actualizar una pregunta existente
router.put("/:id", updateQuestion);

// Ruta para eliminar una pregunta existente
router.delete("/:id", deleteQuestion);

// Ruta para obtener todas las preguntas
router.get("/", getAllQuestions);



export default router;
