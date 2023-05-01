import { Router } from "express";
import { newCareer, updateCareer, deleteCareer, getAllCareer } from "../controllers/career"
const router = Router();

// Ruta para crear una nueva pregunta
router.post("/", newCareer);

// Ruta para actualizar una pregunta existente
router.put("/:id", updateCareer);

// Ruta para eliminar una pregunta existente
router.delete("/:id", deleteCareer);

// Ruta para obtener todas las preguntas
router.get("/", getAllCareer);



export default router;