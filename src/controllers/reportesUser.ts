import { QueryTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = `
    SELECT u.id AS usuario_id, u.primer_nombre, u.primer_apellido, c.career AS carrera, SUM(r.valor) AS afinidad
    FROM users u
    INNER JOIN answers r ON u.id = r.UserId
    INNER JOIN questions q ON r.QuestionId = q.id
    INNER JOIN careers c ON q.CareerId = c.id
    GROUP BY u.id, c.id
    ORDER BY u.id, afinidad DESC;
    `;

    const users = await sequelize.query(query, { type: QueryTypes.SELECT });

    // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
    res.json(users);
  } catch (error) {
    // Maneja el error de consulta
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta de usuarios.' });
  }
};
export const getUnUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT t.id_usuario, t.primer_nombre, u.primer_apellido, t.carrera, t.afinidad
    FROM (
      SELECT u.id as id_usuario, u.primer_nombre, c.career as carrera, SUM(a.valor) as afinidad
      FROM users u
      INNER JOIN answers a ON u.id = a.UserId
      INNER JOIN questions q ON a.QuestionId = q.id
      INNER JOIN careers c ON q.CareerId = c.id
      GROUP BY u.id, c.id
    ) AS t
    INNER JOIN (
      SELECT usuario_id, MAX(afinidad) AS max_afinidad
      FROM (
        SELECT u.id as usuario_id, c.id as carrera_id, SUM(a.valor) as afinidad
        FROM users u
        INNER JOIN answers a ON u.id = a.UserId
        INNER JOIN questions q ON a.QuestionId = q.id
        INNER JOIN careers c ON q.CareerId = c.id
        GROUP BY u.id, c.id
      ) AS t1
      GROUP BY usuario_id
    ) AS t2 ON t.id_usuario = t2.usuario_id AND t.afinidad = t2.max_afinidad
    INNER JOIN users u ON t.id_usuario = u.id
    ORDER BY t.id_usuario;
    `;

    const users = await sequelize.query(query, { type: QueryTypes.SELECT });
    
    // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
    res.json(users);
  } catch (error) {
    // Maneja el error de consulta
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta de usuarios.' });
  }
};

export const getIDUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT t.id_usuario, t.primer_nombre, u.primer_apellido, t.carrera, t.afinidad
    FROM (
      SELECT u.id as id_usuario, u.primer_nombre, c.career as carrera, SUM(a.valor) as afinidad
      FROM users u
      INNER JOIN answers a ON u.id = a.UserId
      INNER JOIN questions q ON a.QuestionId = q.id
      INNER JOIN careers c ON q.CareerId = c.id
      WHERE u.id = :userId  -- Aquí se agrega la condición para el ID de usuario
      GROUP BY u.id, c.id
    ) AS t
    INNER JOIN (
      SELECT usuario_id, MAX(afinidad) AS max_afinidad
      FROM (
        SELECT u.id as usuario_id, c.id as carrera_id, SUM(a.valor) as afinidad
        FROM users u
        INNER JOIN answers a ON u.id = a.UserId
        INNER JOIN questions q ON a.QuestionId = q.id
        INNER JOIN careers c ON q.CareerId = c.id
        GROUP BY u.id, c.id
      ) AS t1
      GROUP BY usuario_id
    ) AS t2 ON t.id_usuario = t2.usuario_id AND t.afinidad = t2.max_afinidad
    INNER JOIN users u ON t.id_usuario = u.id
    ORDER BY t.id_usuario;
    `;

    const users = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements: { userId: id } // Reemplazar :userId con el valor del ID recibido
    });
    
    // Realiza cualquier procesamiento adicional o envía los usuarios como respuesta
    res.json(users);
  } catch (error) {
    // Maneja el error de consulta
    console.error(error);
    res.status(500).json({ error: 'Error en la consulta de usuarios.' });
  }
};


