import { Request, Response } from "express";
import  bcrypt  from 'bcrypt';
import { User } from "../models/user";
import  jwt from "jsonwebtoken";

export const newUser = async(req: Request, res: Response) => {

    const { username, password, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, tipo_identificacion, identificacion, sexo } = req.body;    

    // verificar si exite el usuario

    const user = await User.findOne({ where: { username: username}})
    const documento = await User.findOne({ where: { identificacion: identificacion}})
    const valemail = await User.findOne({ where: { email: email}})

    if (user) {
        return res.status(400).json({
            msg: `El usuario ${username} ya existe`
        })
        
    }
    if (documento) {
        return res.status(400).json({
            msg: `El documento ${identificacion} ya existe`
        })
        
    }
    if (valemail) {
        return res.status(400).json({
            msg: `El email ${email} ya existe`
        })
        
    }
   
    const hastedpassword = await bcrypt.hash(password,10);
    
    try {

        // creacion correcta
        await User.create({
            username: username,
            password: hastedpassword,
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
           msg: `Usuario ${username} creado exitosamentes`
           
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

    const rol = user.rol;
    // generamos token
    const token = jwt.sign({
        username: username,
        rol: rol
       
    },process.env.SECRET_KEY || 'admin')

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
  