import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { Ipessoa } from "../../database/models";
import { PessoasProviders } from "../../database/providers/pessoa";

// Interface do id da cidade nos params
interface IParamsProps {
    id?: number;
}
// Interface do nome da cidade no Body
interface IBodyProps extends Omit<Ipessoa, 'id'> {}

// Middleware de validação com Yup
export const updateByIdValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().email().required(),
        cidadeId: yup.number().integer().required(),
        cep: yup.string().required().max(8)
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

// Update de uma cidade pelo id
// eslint-disable-next-line @typescript-eslint/ban-types
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    const result = await PessoasProviders.UpdateById(Number(req.params.id),req.body);

    if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: result.message
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send(result);
}