import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

// Interface do Get da Cidade
interface IParamProps {
    id?: number;
}

// Middleware de validação com Yup
export const getByIdValidation = validation( (getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

// Buscar uma cidade pelo id
export const getById = async (req: Request<IParamProps>, res: Response) => {
    console.log(req.params.id);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não Implementado!');
}