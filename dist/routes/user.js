"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const valide_token_1 = __importDefault(require("./valide_token"));
const router = (0, express_1.Router)();
router.get('/', valide_token_1.default, user_1.getAllUser);
router.put('/:username', valide_token_1.default, user_1.updateUser);
router.delete("/:username", valide_token_1.default, user_1.deleteUser);
router.put("/login/:username", valide_token_1.default, user_1.changePassword);
exports.default = router;
