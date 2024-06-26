import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { CidadesProviders } from "../../database/providers/cidades";

// Interface do Get das cidades
interface IDeleteProps {
    id?: number;
}

// Middleware de validação com Yup
export const deleteByIdValidation = validation( (getSchema) => ({
    params: getSchema<IDeleteProps>(yup.object().shape({
        id: yup.number().required(),
    })),
}));

// Buscar todas as cidades
// eslint-disable-next-line @typescript-eslint/ban-types
export const deleteById = async (req: Request<IDeleteProps>, res: Response) => {
    const result = await CidadesProviders.DeleteById(req.params.id);
    
    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        })
    }

    if( Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });

    return res.status(StatusCodes.OK).send('Cidade deletada.');
}