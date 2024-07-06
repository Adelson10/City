import { Request, Response } from "express";
import { Iusuario } from "../../database/models/usuario";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { UsuariosProviders } from "../../database/providers/usuario";
import { StatusCodes } from "http-status-codes";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<Iusuario, 'id' | 'nome'> {}

export const signInValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required().min(5),
        senha: yup.string().required().min(6)
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, senha } = req.body;
    
    const usuario = await UsuariosProviders.GetByEmail(email);
    
    if(usuario instanceof Error) return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
            default: 'Email ou senha são Invalidos'
        }
    });

    const verifyPassword = await PasswordCrypto.verifyPassword(senha, usuario.senha);

    if(!verifyPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha são Invalidos'
            }
        });
    }else {
        const accessToken = JWTService.sign({ uid: usuario.id });
        
        if(!accessToken) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar o Token de Acesso'
            }
        });

        return res.status(StatusCodes.OK).json( { accessToken } )
    }
}