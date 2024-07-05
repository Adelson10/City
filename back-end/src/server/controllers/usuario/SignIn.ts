import { Request, Response } from "express";
import { Iusuario } from "../../database/models/usuario";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { UsuariosProviders } from "../../database/providers/usuario";
import { StatusCodes } from "http-status-codes";

interface IBodyProps extends Omit<Iusuario, 'id' | 'nome'> {}

export const signInValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        senha: yup.string().required().min(6)
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body;
    
    const result = await UsuariosProviders.GetByEmail(email);
    
    if(result instanceof Error) return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
            default: 'Email ou senha são Invalidos'
        }
    });
    
    if(senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são Invalidos'
            }
        });
    }else {
        return res.status(StatusCodes.OK).json({
            accessToken: 'teste.teste.teste'
        })
    }
}