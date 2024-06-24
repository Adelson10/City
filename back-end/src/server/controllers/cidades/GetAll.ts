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
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);
    
    return res.status(StatusCodes.OK).json(
        {
            id: 1,
            nome: 'Colinas do Tocantins'
        }
    );
}