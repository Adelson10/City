import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/teste', (_, res) => {
    return res.send('Olá Mundo');
});

router.post('/teste', (req, res) => {    
    return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router }