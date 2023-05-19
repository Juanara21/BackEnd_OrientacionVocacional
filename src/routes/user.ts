import { Router } from "express";
import { loginUser, newUser, getAllUser, updateUser, deleteUser, changePassword , getUserByUsername } from "../controllers/user";
import  valide_token from "./valide_token";
import verify_rol from "./verify_rol";

const router = Router();


router.get('/',valide_token , getAllUser);
router.get('/user/:username',valide_token , getUserByUsername);
router.put('/:username', valide_token, verify_rol("admin"), updateUser);
router.delete("/:username", valide_token, verify_rol("admin"), deleteUser);
router.put("/user/:username", valide_token, verify_rol("user"), changePassword);


export default router;