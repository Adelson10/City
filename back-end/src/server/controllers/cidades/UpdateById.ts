import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

// Interface do id da cidade nos params
interface IParamsProps {
    id?: number;
}
// Interface do nome da cidade no Body
interface IBodyProps {
    nome: string;
}

// Middleware de validação com Yup
export const updateByIdValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

// Update de uma cidade pelo id
// eslint-disable-next-line @typescript-eslint/ban-types
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    if( Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send();
}