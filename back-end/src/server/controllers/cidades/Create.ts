import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICidades } from "../../database/models";
import { CidadesProviders } from "../../database/providers/cidades";

// Interface da Cidade
interface IBodyProps extends Omit<ICidades, 'id'> {}

// Middleware de validação com Yup
export const createValidation = validation( (getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    })),
}));

// Criando uma cidade
// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await CidadesProviders.create(req.body);

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result);
}