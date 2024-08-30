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
exports.deleteCareer = exports.updateCareer = exports.getAllCareer = exports.newCareer = void 0;
const career_1 = require("../models/career");
const newCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const career = req.body;
    // verificar si exite el usuario
    const careera = yield career_1.Career.findOne({ where: { career: career.career } });
    if (careera) {
        return res.status(400).json({
            msg: `La carrera ${career.career} ya existe`
        });
    }
    try {
        // creacion correcta
        yield career_1.Career.create({
            career: career.career
        });
        res.json({
            msg: `Carrera agregada exitosamentes`
        });
    }
    catch (error) {
        // error
        res.status(400).json({
            msg: 'Ups! Ocurrio un error al agregar la carrera',
            error
        });
    }
});
exports.newCareer = newCareer;
const getAllCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const career = yield career_1.Career.findAll();
        res.json(career);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las carreras',
            error,
        });
    }
});
exports.getAllCareer = getAllCareer;
const updateCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { career } = req.body;
    try {
        const careera = yield career_1.Career.findOne({ where: { id: id } });
        const careerexistente = yield career_1.Career.findOne({ where: { career: career } });
        if (!careera) {
            return res.status(404).json({ msg: 'Carrera no encontrada' });
        }
        if (careerexistente) {
            return res.status(404).json({ msg: 'Carrera ya existente' });
        }
        yield careera.update({
            career: career
        });
        res.json({
            msg: `Carrera ${career} actualizada correctamente`,
            career,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la Carrera',
            error,
        });
    }
});
exports.updateCareer = updateCareer;
const deleteCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const career = yield career_1.Career.findByPk(id);
        if (!career) {
            return res.status(404).json({ msg: 'Carrera no encontrada' });
        }
        yield career.destroy();
        res.json({
            msg: 'Carrera eliminada correctamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la carrera',
            error,
        });
    }
});
exports.deleteCareer = deleteCareer;
