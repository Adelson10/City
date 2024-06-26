import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { CidadesProviders } from "../../database/providers/cidades";

// Interface do Get da Cidade
interface IParamProps {
    id?: number;
}

// Middleware de validação com Yup
export const getByIdValidation = validation( (getSchema) => ({
    params: getSchema<IParamProps> (yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

// Buscar uma cidade pelo id
export const getById = async (req: Request<IParamProps>, res: Response) => {
    if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
        erros: {
            default: 'O parametro "id" e preciso ser informado.'
        }
    });

    const result = await CidadesProviders.GetById(Number(req.params.id));
    if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });
    return res.status(StatusCodes.OK).json(result);
}