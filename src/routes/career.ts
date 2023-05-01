import { Router } from "express";
import { newCareer, updateCareer, deleteCareer, getAllCareer } from "../controllers/career"
import valide_token from "./valide_token";

const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", valide_token, newCareer);

// Ruta para actualizar una pregunta existente
router.put("/:id", valide_token, updateCareer);

// Ruta para eliminar una pregunta existente
router.delete("/:id", valide_token, deleteCareer);

// Ruta para obtener todas las preguntas
router.get("/", valide_token, getAllCareer);



export default router;