import { Router } from "express";
import { loginUser, newUser, getAllUser, updateUser, deleteUser, changePassword } from "../controllers/user";
import  valide_token from "./valide_token";

const router = Router();


router.get('/', valide_token , getAllUser);
router.put('/:username', valide_token, updateUser);
router.delete("/:username", valide_token, deleteUser);
router.put("/login/:username", valide_token, changePassword);


export default router;