import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export interface IQuestion {
    id?: number; // La propiedad `id` es opcional ya que es autogenerada.
    descripcion: string;
    CareerId?: number; // Llave foránea que hace referencia a la carrera.
  }
  

export const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });