import { StatusCodes } from "http-status-codes";
import { Ipessoa } from "../../database/models";
import { PessoasProviders } from "../../database/providers/pessoa";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { Request, Response } from "express";

interface IBodyProps extends Omit<Ipessoa, 'id'> {}

export const createValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().email().required(),
        cidadeId: yup.number().integer().required(),
        cep: yup.number().integer().required()
    })),
}));

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await PessoasProviders.create(req.body);

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result);
}