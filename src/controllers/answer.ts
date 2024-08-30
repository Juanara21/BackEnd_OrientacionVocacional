import { Request, Response } from "express";
import { User } from '../models/user';
import { Answer, IAnswer } from "../models/answer";
import { Question } from "../models/question";

export const newAnswer = async (req: Request, res: Response) => {

  
    const answerData: IAnswer = req.body;

   
    try {

        // creacion correcta
        await Answer.create({
            valor: answerData.valor,
            UserId: answerData.UserId,
            QuestionId: answerData.QuestionId

        })
       
        res.json({
           msg: `Respuesta agregada correctamente`
           
        })
    } catch (error) {

        // error
       res.status(400).json({
        msg: 'Ups! Ocurrio un error al agregar la respuesta, comuniquese con el administrador',
        error
       }) 
    }
   

};
export const getAllAnswer = async (req: Request, res: Response) => {
    try {
        const answer = await Answer.findAll({

            include: [
                {
                    model: User,
                    attributes: ['username'] // selecciona las columnas que quieres mostrar de la tabla Question
                  },
                {
                  model: Question,
                  attributes: ['descripcion'] // selecciona las columnas que quieres mostrar de la tabla Question
                }
              ]

        });
        res.json(answer);
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al obtener las respuestas',
            error,
        });
    }
};
export const updateAnswer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { answer } = req.body;

    try {
        const respuesta = await Answer.findOne({ where: { id:id } });
       
        if (!respuesta) {
            return res.status(404).json({ msg: 'Respuesta no encontrada' });
        }
      

        await respuesta.update({
            valor: answer
            
        })

        res.json({
            msg: `Respuesta actualizada correctamente`,
            respuesta,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar la respuesta',
            error,
        });
    }
};
export const deleteAnswer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const respuesta = await Answer.findByPk(id);
        if (!respuesta) {
            return res.status(404).json({ msg: 'Respuesta no encontrada' });
        }

        await respuesta.destroy();

        res.json({
            msg: 'respuesta eliminada correctamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al eliminar la respuesta',
            error,
        });
    }
};

