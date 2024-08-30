import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export interface IUser {
  id?: number; // La propiedad `id` es opcional ya que es autogenerada.
  username: string;
  password: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  tipo_identificacion: string;
  identificacion: number;
  sexo: string;
  rol?: string; // `rol` es opcional y tiene un valor por defecto.
}


export const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { 
        type: DataTypes.STRING,
        
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    tipo_identificacion: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    identificacion: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
       
    })


    