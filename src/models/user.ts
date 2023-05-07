import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    }, 
       
    })
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
      
      // Definir el modelo de Preguntas
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
      
      // Definir el modelo de Respuestas
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
      
      // Establecer las relaciones entre los modelos
         
      Question.belongsTo(Career);
      Career.hasMany(Question);
      
      Question.belongsTo(Career, { foreignKey: 'CareerId' });
      Career.hasMany(Question, { foreignKey: 'CareerId' });
      
      Answer.belongsTo(User, { foreignKey: 'UserId' });
      User.hasMany(Answer, { foreignKey: 'UserId' });

      Answer.belongsTo(Question, { foreignKey: 'QuestionId' });
      Question.hasMany(Answer, { foreignKey: 'QuestionId' });

    