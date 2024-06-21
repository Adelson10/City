import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

// Interface da Cidade
interface ICidade {
    nome: string
}

// Middleware de validação com Yup
export const createValidation = validation( (getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    })),
}));

// Criando uma cidade
// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);

    return res.status(StatusCodes.CREATED).send('Não Implementado!');
}