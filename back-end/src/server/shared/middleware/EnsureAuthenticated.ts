import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated: RequestHandler = async (req,res,next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
            default: 'Usuario não autorizado'
        }
    });

    const [type, token] = authorization.split(' ');
    
    if(type !== 'Bearer') return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: { default: 'Usuario não autorizado' }
    });

    return next();
}