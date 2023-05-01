import { Request, Response } from "express";
import { Question, Career } from '../models/user';

export const newQuestion = async (req: Request, res: Response) => {

    const { descripcion, CareerId } = req.body;

    
    // verificar si exite el usuario

    const question = await Question.findOne({ where: { descripcion: descripcion}})

    if (question) {
        return res.status(400).json({
            msg: `La pregunta ${descripcion} ya existe`
        })
        
    }
   
    try {

        // creacion correcta
        await Question.create({
            descripcion: descripcion,
            CareerId: CareerId

        })
       
        res.json({
           msg: `Pregunta creada exitosamentes`
           
        })
    } catch (error) {

        // error
       res.status(400).json({
        msg: 'Ups! Ocurrio un error al crear la pregunta',
        error
       }) 
    }
   

};
export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.findAll({

            include: [
                {
                    model: Career,
                    attributes: ['career'] // selecciona las columnas que quieres mostrar de la tabla Question
                  }
              ]
        });
        res.json({ questions });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las preguntas',
            error,
        });
    }
};
export const updateQuestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { descripcion, CareerId } = req.body;

    try {
        const questionexistente = await Question.findOne({ where: { descripcion:descripcion } });
        const question = await Question.findOne({ where: { id:id } });
        if (!question) {
            return res.status(404).json({ msg: 'Pregunta no encontrada' });
        }
        if (questionexistente) {
            return res.status(404).json({ msg: 'Pregunta ya existente' });
        }
        await question.update({ 
            descripcion: descripcion,
            CareerId: CareerId
         });

        res.json({
            msg: 'Pregunta actualizada correctamente',
            question,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la pregunta',
            error,
        });
    }
};
export const deleteQuestion = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const question = await Question.findByPk(id);
        if (!question) {
            return res.status(404).json({ msg: 'Pregunta no encontrada' });
        }

        await question.destroy();

        res.json({
            msg: 'Pregunta eliminada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la pregunta',
            error,
        });
    }
};

