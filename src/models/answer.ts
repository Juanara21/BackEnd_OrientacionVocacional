import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export interface IAnswer {
    id?: number; // La propiedad `id` es opcional ya que es autogenerada.
    valor: number;
    UserId?: number; // Llave foránea que hace referencia al usuario.
    QuestionId?: number; // Llave foránea que hace referencia a la pregunta.
  }



export const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });