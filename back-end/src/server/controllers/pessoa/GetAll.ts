import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { PessoasProviders } from "../../database/providers/pessoa";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation( (getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await PessoasProviders.GetAll( req.query.page || 1, req.query.limit || 7, req.query.filter || '');
    const count = await PessoasProviders.Count(req.query.filter);

    console.log('IdUsuario', req.headers.idUsuario);

    if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message }
    });
    else if (count instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        erros: { default: count.message } 
    })

    res.setHeader('acesss-control-expose-headers','x-total-count');
    res.setHeader('x-total-count', count);
    
    return res.status(StatusCodes.OK).json(result);
}