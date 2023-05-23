import { Router } from "express";
import { getUsers, getUnUsers, getIDUsers } from "../controllers/reportesUser"
import valide_token from "./valide_token";
import verify_rol from "./verify_rol";

const router = Router();
// Ruta para obtener todas las preguntas
router.get("/", valide_token, verify_rol("admin"),  getUsers);
router.get("/user", valide_token, verify_rol("admin"), getUnUsers);
router.get("/:id", valide_token, getIDUsers);




export default router;
