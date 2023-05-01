import { Router } from "express";
import { newAnswer, updateAnswer, deleteAnswer, getAllAnswer} from "../controllers/answer"
const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", newAnswer);

// Ruta para actualizar una pregunta existente
router.put("/:id", updateAnswer);

// Ruta para eliminar una pregunta existente
router.delete("/:id", deleteAnswer);

// Ruta para obtener todas las preguntas
router.get("/", getAllAnswer);



export default router;