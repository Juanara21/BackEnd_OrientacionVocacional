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
exports.deleteAnswer = exports.updateAnswer = exports.getAllAnswer = exports.newAnswer = void 0;
const user_1 = require("../models/user");
const answer_1 = require("../models/answer");
const question_1 = require("../models/question");
const newAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const answerData = req.body;
    try {
        // creacion correcta
        yield answer_1.Answer.create({
            valor: answerData.valor,
            UserId: answerData.UserId,
            QuestionId: answerData.QuestionId
        });
        res.json({
            msg: `Respuesta agregada correctamente`
        });
    }
    catch (error) {
        // error
        res.status(400).json({
            msg: 'Ups! Ocurrio un error al agregar la respuesta, comuniquese con el administrador',
            error
        });
    }
});
exports.newAnswer = newAnswer;
const getAllAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield answer_1.Answer.findAll({
            include: [
                {
                    model: user_1.User,
                    attributes: ['username'] // selecciona las columnas que quieres mostrar de la tabla Question
                },
                {
                    model: question_1.Question,
                    attributes: ['descripcion'] // selecciona las columnas que quieres mostrar de la tabla Question
                }
            ]
        });
        res.json(answer);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las respuestas',
            error,
        });
    }
});
exports.getAllAnswer = getAllAnswer;
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { answer } = req.body;
    try {
        const respuesta = yield answer_1.Answer.findOne({ where: { id: id } });
        if (!respuesta) {
            return res.status(404).json({ msg: 'Respuesta no encontrada' });
        }
        yield respuesta.update({
            valor: answer
        });
        res.json({
            msg: `Respuesta actualizada correctamente`,
            respuesta,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la respuesta',
            error,
        });
    }
});
exports.updateAnswer = updateAnswer;
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const respuesta = yield answer_1.Answer.findByPk(id);
        if (!respuesta) {
            return res.status(404).json({ msg: 'Respuesta no encontrada' });
        }
        yield respuesta.destroy();
        res.json({
            msg: 'respuesta eliminada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la respuesta',
            error,
        });
    }
});
exports.deleteAnswer = deleteAnswer;
