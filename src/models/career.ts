import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export interface ICareer {
    id?: number; 
    career: string;
  }
  

export const Career = sequelize.define('Career', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    career: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });
  