import { Request, Response } from "express";
import * as yup from "yup";
import StatusCode from "http-status-codes"

interface ICidade {
    nome: string,
    estado: string
}

const BodyValidation: yup.Schema<ICidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validatedData: ICidade | undefined = undefined;

    try {
        validatedData = await BodyValidation.validate(req.body, { abortEarly: false });
    } catch (err) {

        const yupError = err as yup.ValidationError;
        const ValidatorError: Record<string,string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            ValidatorError[error.path] = error.message;
        });

        return res.status(StatusCode.BAD_REQUEST).json({ errors: ValidatorError });
    }

    console.log(validatedData);
    

    return res.send('Create');
}