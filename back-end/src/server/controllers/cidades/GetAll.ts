import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { CidadesProviders } from "../../database/providers/cidades";

// Interface do Get das cidades
interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

// Middleware de validação com Yup
export const getAllValidation = validation( (getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().moreThan(0),
        filter: yup.string().optional()
    })),
}));

// Buscar todas as cidades
// eslint-disable-next-line @typescript-eslint/ban-types
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await CidadesProviders.GetAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id));
    const count = await CidadesProviders.Count(req.query.filter);

    if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message }
    });
    else if(count instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        Errors: { default: count.message }
    })
    
    res.setHeader('acesss-control-expose-headers','x-total-count');
    res.setHeader('x-total-count', count);
    
    return res.status(StatusCodes.OK).json(result);
}