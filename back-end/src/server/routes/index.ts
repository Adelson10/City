import { Router } from "express";
import { CidadesController } from "../controllers";
import { PessoaController } from "../controllers/pessoa";
import { UsuarioController } from "../controllers/usuario";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();
//Cidades
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create );
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll );
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

//Pessoa
router.post('/pessoas', ensureAuthenticated, PessoaController.createValidation, PessoaController.create );
router.get('/pessoas', ensureAuthenticated, PessoaController.getAllValidation, PessoaController.getAll);
router.get('/pessoas/:id', ensureAuthenticated, PessoaController.getByIdValidation, PessoaController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoaController.deleteByIdValidation, PessoaController.deleteById);

//Usuario
router.post('/cadastro', UsuarioController.signUpValidation, UsuarioController.signUp );
router.post('/login', UsuarioController.signInValidation, UsuarioController.signIn );

export { router }