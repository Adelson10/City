import { Router } from "express";
import { CidadesController } from "../controllers";
import { PessoaController } from "../controllers/pessoa";

const router = Router();
//Cidades
router.post('/cidades', CidadesController.createValidation, CidadesController.create );
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll );
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

//Pessoa
router.post('/pessoa', PessoaController.createValidation, PessoaController.create );
router.get('/pessoa', PessoaController.getAllValidation, PessoaController.getAll);
router.get('/pessoa/:id', PessoaController.getByIdValidation, PessoaController.getById);
router.put('/pessoa/:id', PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete('/pessoa/:id', PessoaController.deleteByIdValidation, PessoaController.deleteById);

export { router }