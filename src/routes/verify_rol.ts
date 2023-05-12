import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const headerToken = req.headers['authorization'];

        if(headerToken !== undefined && headerToken.startsWith('Bearer ')) {
            try {
                const bearerToken = headerToken.slice(7);
                const decodedToken: any = jwt.verify(bearerToken, process.env.SECRET_KEY || 'admin');
            
                if(decodedToken.rol === role) {
                    next();
                } else {
                    res.status(401).json({
                        msg: 'No tiene permiso para realizar esta acción'
                    });
                }
            } catch (error) {
                res.status(401).json({
                    msg: 'Token no válido'
                });
            }
        } 
    };
};

export default verifyRole ;


