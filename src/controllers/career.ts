import { Request, Response } from "express";
import { Career } from '../models/user';

export const newCareer = async (req: Request, res: Response) => {

    const { career } = req.body;

    
    // verificar si exite el usuario

    const careera = await Career.findOne({ where: { career: career}})

    if (careera) {
        return res.status(400).json({
            msg: `La carrera ${career} ya existe`
        })
        
    }
   
    try {

        // creacion correcta
        await Career.create({
            career: career

        })
       
        res.json({
           msg: `Carrera agregada exitosamentes`
           
        })
    } catch (error) {

        // error
       res.status(400).json({
        msg: 'Ups! Ocurrio un error al agregar la carrera',
        error
       }) 
    }
   

};
export const getAllCareer = async (req: Request, res: Response) => {
    try {
        const career = await Career.findAll();
        res.json(career);
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las carreras',
            error,
        });
    }
};
export const updateCareer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { career } = req.body;

    try {
        const careera = await Career.findOne({ where: { id:id } });
        const careerexistente = await Career.findOne({ where: { career:career } });
        if (!careera) {
            return res.status(404).json({ msg: 'Carrera no encontrada' });
        }
        if (careerexistente) {
            return res.status(404).json({ msg: 'Carrera ya existente' });
        }

        await careera.update({
            career: career

        })

        res.json({
            msg: `Carrera ${career} actualizada correctamente`,
            career,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la Carrera',
            error,
        });
    }
};
export const deleteCareer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const career = await Career.findByPk(id);
        if (!career) {
            return res.status(404).json({ msg: 'Carrera no encontrada' });
        }

        await career.destroy();

        res.json({
            msg: 'Carrera eliminada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la carrera',
            error,
        });
    }
};

