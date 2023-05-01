import { Router } from "express";
import { newQuestion, updateQuestion, deleteQuestion, getAllQuestions } from "../controllers/question"
import valide_token from "./valide_token";

const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", valide_token, newQuestion);

// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token, updateQuestion);

// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token, deleteQuestion);

// Ruta para obtener todas las preguntas
router.get("/", valide_token, getAllQuestions);



export default router;
