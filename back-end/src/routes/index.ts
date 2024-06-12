import { Router } from "express";

const router = Router();

router.get('/teste', (_, res) => {
    return res.send('Olá Mundo');
});

router.post('/teste', (req, res) => {
    console.log(req.body);
    
    return res.send('Olá teste');
});

export { router }