import { Router } from "express";
import { newAnswer, updateAnswer, deleteAnswer, getAllAnswer} from "../controllers/answer"
import valide_token from "./valide_token";

const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", valide_token, newAnswer);

// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token, updateAnswer);

// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token, deleteAnswer);

// Ruta para obtener todas las preguntas
router.get("/", valide_token, getAllAnswer);



export default router;