"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const valide_token_1 = __importDefault(require("./valide_token"));
const verify_rol_1 = __importDefault(require("./verify_rol"));
const router = (0, express_1.Router)();
router.get('/', valide_token_1.default, user_1.getAllUser);
router.get('/user/:username', valide_token_1.default, user_1.getUserByUsername);
router.put('/:username', valide_token_1.default, user_1.updateUser);
router.delete("/:username", valide_token_1.default, (0, verify_rol_1.default)("admin"), user_1.deleteUser);
router.put("/user/:username", valide_token_1.default, user_1.changePassword);
exports.default = router;
