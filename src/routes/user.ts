import { Router } from "express";
import { loginUser, newUser, getAllUser, updateUser, deleteUser, changePassword } from "../controllers/user";

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', getAllUser);
router.put('/:username', updateUser);
router.delete("/:username", deleteUser);
router.put("/login/:username", changePassword);


export default router;