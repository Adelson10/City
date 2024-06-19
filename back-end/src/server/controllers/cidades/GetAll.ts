import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

// Interface do Get das cidades
interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string
}

// Middleware de validação com Yup
export const getAllValidation = validation( (getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    })),
}));

// Buscar todas as cidades
// eslint-disable-next-line @typescript-eslint/ban-types
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não Implementado!');
}