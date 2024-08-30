import { Request, Response } from "express";
import  bcrypt  from 'bcryptjs';
import { IUser, User } from "../models/user";
import  jwt from "jsonwebtoken";
import sequelize from "../db/connection";

export const newUser = async(req: Request, res: Response) => {

    const newUser: IUser = req.body;    

    // verificar si exite el usuario
    if (newUser.username.includes(' ')) {
      return res.status(400).json({
        msg: 'El nombre de usuario no puede contener espacios'
      });
    }
  
    // Verificar que la identificacion tenga exactamente 10 digitos
    if (newUser.identificacion.toString().length !== 10) {
      return res.status(400).json({
        msg: 'El número de identificación debe tener 10 dígitos'
      });
    }
  
    // Verificar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      return res.status(400).json({
        msg: 'El correo electrónico no tiene un formato válido, Ej: Orientacion@developer.com'
      });
    }

    if (newUser.password.length < 8) {
      return res.status(400).json({
        msg: 'La contraseña debe tener al menos 8 caracteres'
      });
    }

    const user = await User.findOne({ where: { username: newUser.username}})
    const documento = await User.findOne({ where: { identificacion: newUser.identificacion}})
    const valemail = await User.findOne({ where: { email: newUser.email}})

    if (user) {
        return res.status(400).json({
            msg: `El usuario ${newUser.username} ya existe`
        })
        
    }
    if (documento) {
        return res.status(400).json({
            msg: `El documento ${newUser.identificacion} ya existe`
        })
        
    }
    if (valemail) {
        return res.status(400).json({
            msg: `El email ${newUser.email} ya existe`
        })
        
    }
   
    const hastedpassword = await bcrypt.hash(newUser.password,10);
    
    try {

        // creacion correcta
        await User.create({
            username: newUser.username,
            password: hastedpassword,
            primer_nombre: newUser.primer_nombre,
            segundo_nombre: newUser.segundo_nombre,
            primer_apellido: newUser.primer_apellido,
            segundo_apellido: newUser.segundo_apellido,
            email: newUser.email,
            tipo_identificacion: newUser.tipo_identificacion,
            identificacion: newUser.identificacion,
            sexo: newUser.sexo
    
        })
       
        res.json({
           msg: `Usuario ${newUser.username} creado exitosamentes`
           
        })
    } catch (error) {

        // error
       res.status(400).json({
        msg: 'Ups! Ocurrio un error al crear',
        error
       }) 
    }
   

}

export const loginUser = async (req: Request, res: Response) => {

    
    
    const { username, password } = req.body;    

    // verificar si exite el usuario

    const user: any = await User.findOne({ where: { username: username}})

    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`
        })
        
    }

    // validamos password
    const passwordvalid = await bcrypt.compare(password, user.password)
    if(!passwordvalid){
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    }
    const id = user.id;
    const rol = user.rol;
    // generamos token

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw new Error("La clave secreta (SECRET_KEY) no está definida en el entorno");
    }

    const token = jwt.sign({
        username: username,
        rol: rol,
        id: id
       
    },secretKey,
    { expiresIn: '1h' }
  );

    res.json(token)

}
export const getAllUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findAll({
        attributes: {
          exclude: ['password']
        }
      });
  
      res.json(user);
  
    } catch (error) {
      res.status(400).json({
        msg: 'Ups! Ocurrio un error al obtener los usuarios',
        error
      });
    }
}

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne({
      where: { username },
      attributes: {
        exclude: ['password']
      }
    });
  
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  
    res.json(user);
  
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el usuario',
      error
    });
  }
};


export const updateUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, tipo_identificacion, identificacion, sexo } = req.body;    
    

    try {
        // Verificar si existe el usuario
        const user = await User.findOne({ where: { username: username } })
       
       
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`
            })
        }
        const verificaruser = user.dataValues.identificacion;
            
            
            if (identificacion && identificacion !== verificaruser) {
              const documento = await User.findOne({ where: { identificacion: identificacion}})
              if (documento) {
              return res.status(400).json({
                  msg: `El documento ${identificacion} ya existe`
              })            
              }
            }

         const verificaremail = user.dataValues.email;
            
            
            if (email && email !== verificaremail) {
              const valemail = await User.findOne({ where: { email: email}})
              if (valemail) {
                return res.status(400).json({
                    msg: `El email ${email} ya existe`
                })
                
            }
            }   
        
  // Actualizar campos del usuario
        await user.update({
           
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            email: email,
            tipo_identificacion: tipo_identificacion,
            identificacion: identificacion,
            sexo: sexo
        })

        res.json({
            msg: `Usuario ${username} actualizado exitosamente`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ups! Ocurrió un error al actualizar el usuario',
            error
        }) 
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { username } = req.params;
  
    try {
      // Verificar si existe el usuario
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(400).json({
          msg: `No existe el usuario registrado con el nombre ${username} en la base de datos`,
        });
      }
  
      // Eliminar el usuario
      await user.destroy();
  
      res.json({
        msg: `Usuario ${username} eliminado exitosamente`,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Ups! Ocurrió un error al eliminar el usuario",
        error,
      });
    }
  };
export const changePassword = async (req: Request, res: Response) => {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Buscar el usuario por nombre de usuario
      const user: any = await User.findOne({ where: { username: username}})
      if (!user) {
        return res.status(400).json({
          msg: `No se encontró el usuario con el nombre de usuario ${username}`,
        });
      }
  
      // Verificar la contraseña anterior
      const passwordValid = await bcrypt.compare(oldPassword, user.password);
      if (!passwordValid) {
        return res.status(400).json({
          msg: 'La contraseña ingresada no es válida',
        });
      }
  
      // Generar una nueva contraseña hash
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualizar la contraseña del usuario
      await user.update({
        password: hashedPassword,
      });
  
      res.json({
        msg: 'La contraseña ha sido cambiada exitosamente',
      });
    } catch (error) {
      res.status(400).json({
        msg: 'Ups! Ocurrió un error al cambiar la contraseña',
        error,
      });
    }
  };

export  const createDefaultUser = async () => {
    try {
      await sequelize.sync(); // Asegúrate de que la base de datos esté sincronizada
  
      // Verifica si ya existe el usuario por defecto
      const userExists = await User.findOne({ where: { identificacion: 99999 } });

      const hastedpassword = await bcrypt.hash("defaultPassword",10);
  
      if (!userExists) {
        // Crea el usuario por defecto
        await User.create({
          username: 'defaultUser',
          password: hastedpassword, 
          primer_nombre: 'Default',
          segundo_nombre: 'User',
          primer_apellido: 'Default',
          segundo_apellido: 'User',
          email: 'defaultuser@example.com',
          tipo_identificacion: 'DNI',
          identificacion: 99999,
          sexo: 'M',
          rol: 'admin', 
        });
  
        console.log('Usuario por defecto creado exitosamente.');
      } else {
        console.log('El usuario por defecto ya existe.');
      }
    } catch (error) {
      console.error('Error al crear el usuario por defecto:', error);
    }
  };