"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.deleteUser = exports.updateUser = exports.getUserByUsername = exports.getAllUser = exports.loginUser = exports.newUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    // verificar si exite el usuario
    if (newUser.username.includes(' ')) {
        return res.status(400).json({
            msg: 'El nombre de usuario no puede contener espacios'
        });
    }
    // Verificar que la identificacion tenga exactamente 10 digitos
    if (newUser.identificacion.toString().length !== 10) {
        return res.status(400).json({
            msg: 'El número de identificación debe tener 10 dígitos'
        });
    }
    // Verificar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
        return res.status(400).json({
            msg: 'El correo electrónico no tiene un formato válido, Ej: Orientacion@developer.com'
        });
    }
    if (newUser.password.length < 8) {
        return res.status(400).json({
            msg: 'La contraseña debe tener al menos 8 caracteres'
        });
    }
    const user = yield user_1.User.findOne({ where: { username: newUser.username } });
    const documento = yield user_1.User.findOne({ where: { identificacion: newUser.identificacion } });
    const valemail = yield user_1.User.findOne({ where: { email: newUser.email } });
    if (user) {
        return res.status(400).json({
            msg: `El usuario ${newUser.username} ya existe`
        });
    }
    if (documento) {
        return res.status(400).json({
            msg: `El documento ${newUser.identificacion} ya existe`
        });
    }
    if (valemail) {
        return res.status(400).json({
            msg: `El email ${newUser.email} ya existe`
        });
    }
    const hastedpassword = yield bcryptjs_1.default.hash(newUser.password, 10);
    try {
        // creacion correcta
        yield user_1.User.create({
            username: newUser.username,
            password: hastedpassword,
            primer_nombre: newUser.primer_nombre,
            segundo_nombre: newUser.segundo_nombre,
            primer_apellido: newUser.primer_apellido,
            segundo_apellido: newUser.segundo_apellido,
            email: newUser.email,
            tipo_identificacion: newUser.tipo_identificacion,
            identificacion: newUser.identificacion,
            sexo: newUser.sexo
        });
        res.json({
            msg: `Usuario ${newUser.username} creado exitosamentes`
        });
    }
    catch (error) {
        // error
        res.status(400).json({
            msg: 'Ups! Ocurrio un error al crear',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // verificar si exite el usuario
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`
        });
    }
    // validamos password
    const passwordvalid = yield bcryptjs_1.default.compare(password, user.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        });
    }
    const id = user.id;
    const rol = user.rol;
    // generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username,
        rol: rol,
        id: id
    }, process.env.SECRET_KEY || 'admin');
    res.json(token);
});
exports.loginUser = loginUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrio un error al obtener los usuarios',
            error
        });
    }
});
exports.getAllUser = getAllUser;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield user_1.User.findOne({
            where: { username },
            attributes: {
                exclude: ['password']
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener el usuario',
            error
        });
    }
});
exports.getUserByUsername = getUserByUsername;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, tipo_identificacion, identificacion, sexo } = req.body;
    try {
        // Verificar si existe el usuario
        const user = yield user_1.User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`
            });
        }
        const verificaruser = user.dataValues.identificacion;
        if (identificacion && identificacion !== verificaruser) {
            const documento = yield user_1.User.findOne({ where: { identificacion: identificacion } });
            if (documento) {
                return res.status(400).json({
                    msg: `El documento ${identificacion} ya existe`
                });
            }
        }
        const verificaremail = user.dataValues.email;
        if (email && email !== verificaremail) {
            const valemail = yield user_1.User.findOne({ where: { email: email } });
            if (valemail) {
                return res.status(400).json({
                    msg: `El email ${email} ya existe`
                });
            }
        }
        // Actualizar campos del usuario
        yield user.update({
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            email: email,
            tipo_identificacion: tipo_identificacion,
            identificacion: identificacion,
            sexo: sexo
        });
        res.json({
            msg: `Usuario ${username} actualizado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar el usuario',
            error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        // Verificar si existe el usuario
        const user = yield user_1.User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`,
            });
        }
        // Eliminar el usuario
        yield user.destroy();
        res.json({
            msg: `Usuario ${username} eliminado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups! Ocurrió un error al eliminar el usuario",
            error,
        });
    }
});
exports.deleteUser = deleteUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        // Buscar el usuario por nombre de usuario
        const user = yield user_1.User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No se encontró el usuario con el nombre de usuario ${username}`,
            });
        }
        // Verificar la contraseña anterior
        const passwordValid = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'La contraseña ingresada no es válida',
            });
        }
        // Generar una nueva contraseña hash
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        // Actualizar la contraseña del usuario
        yield user.update({
            password: hashedPassword,
        });
        res.json({
            msg: 'La contraseña ha sido cambiada exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al cambiar la contraseña',
            error,
        });
    }
});
exports.changePassword = changePassword;
