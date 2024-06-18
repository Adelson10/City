import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// Interface da Cidade
interface ICidade {
}

// Middleware de validação com Yup
export const createValidation = validation( (getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado: yup.string().required().min(3),
    })),
}));

// Criando uma cidade
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);

    return res.send('Create');
}