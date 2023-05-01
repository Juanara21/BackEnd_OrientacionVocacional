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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.getAllQuestions = exports.newQuestion = void 0;
const user_1 = require("../models/user");
const newQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion, CareerId } = req.body;
    // verificar si exite el usuario
    const question = yield user_1.Question.findOne({ where: { descripcion: descripcion } });
    if (question) {
        return res.status(400).json({
            msg: `La pregunta ${descripcion} ya existe`
        });
    }
    try {
        // creacion correcta
        yield user_1.Question.create({
            descripcion: descripcion,
            CareerId: CareerId
        });
        res.json({
            msg: `Pregunta creada exitosamentes`
        });
    }
    catch (error) {
        // error
        res.status(400).json({
            msg: 'Ups! Ocurrio un error al crear la pregunta',
            error
        });
    }
});
exports.newQuestion = newQuestion;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield user_1.Question.findAll({
            include: [
                {
                    model: user_1.Career,
                    attributes: ['career'] // selecciona las columnas que quieres mostrar de la tabla Question
                }
            ]
        });
        res.json({ questions });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las preguntas',
            error,
        });
    }
});
exports.getAllQuestions = getAllQuestions;
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion, CareerId } = req.body;
    try {
        const questionexistente = yield user_1.Question.findOne({ where: { descripcion: descripcion } });
        const question = yield user_1.Question.findOne({ where: { id: id } });
        if (!question) {
            return res.status(404).json({ msg: 'Pregunta no encontrada' });
        }
        if (questionexistente) {
            return res.status(404).json({ msg: 'Pregunta ya existente' });
        }
        yield question.update({
            descripcion: descripcion,
            CareerId: CareerId
        });
        res.json({
            msg: 'Pregunta actualizada correctamente',
            question,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la pregunta',
            error,
        });
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const question = yield user_1.Question.findByPk(id);
        if (!question) {
            return res.status(404).json({ msg: 'Pregunta no encontrada' });
        }
        yield question.destroy();
        res.json({
            msg: 'Pregunta eliminada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la pregunta',
            error,
        });
    }
});
exports.deleteQuestion = deleteQuestion;
