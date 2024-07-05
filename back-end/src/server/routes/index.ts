import { Router } from "express";
import { CidadesController } from "../controllers";
import { PessoaController } from "../controllers/pessoa";
import { UsuarioController } from "../controllers/usuario";

const router = Router();
//Cidades
router.post('/cidades', CidadesController.createValidation, CidadesController.create );
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll );
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

//Pessoa
router.post('/pessoas', PessoaController.createValidation, PessoaController.create );
router.get('/pessoas', PessoaController.getAllValidation, PessoaController.getAll);
router.get('/pessoas/:id', PessoaController.getByIdValidation, PessoaController.getById);
router.put('/pessoas/:id', PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete('/pessoas/:id', PessoaController.deleteByIdValidation, PessoaController.deleteById);

//Usuario
router.post('/cadastro', UsuarioController.signUpValidation, UsuarioController.signUp );
router.post('/login', UsuarioController.signInValidation, UsuarioController.signIn );

export { router }