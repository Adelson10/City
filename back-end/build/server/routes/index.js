"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const pessoa_1 = require("../controllers/pessoa");
const usuario_1 = require("../controllers/usuario");
const middleware_1 = require("../shared/middleware");
const router = (0, express_1.Router)();
exports.router = router;
//Cidades
router.post('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.createValidation, controllers_1.CidadesController.create);
router.get('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getAllValidation, controllers_1.CidadesController.getAll);
router.get('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getByIdValidation, controllers_1.CidadesController.getById);
router.put('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.updateByIdValidation, controllers_1.CidadesController.updateById);
router.delete('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.deleteByIdValidation, controllers_1.CidadesController.deleteById);
//Pessoa
router.post('/pessoas', middleware_1.ensureAuthenticated, pessoa_1.PessoaController.createValidation, pessoa_1.PessoaController.create);
router.get('/pessoas', middleware_1.ensureAuthenticated, pessoa_1.PessoaController.getAllValidation, pessoa_1.PessoaController.getAll);
router.get('/pessoas/:id', middleware_1.ensureAuthenticated, pessoa_1.PessoaController.getByIdValidation, pessoa_1.PessoaController.getById);
router.put('/pessoas/:id', middleware_1.ensureAuthenticated, pessoa_1.PessoaController.updateByIdValidation, pessoa_1.PessoaController.updateById);
router.delete('/pessoas/:id', middleware_1.ensureAuthenticated, pessoa_1.PessoaController.deleteByIdValidation, pessoa_1.PessoaController.deleteById);
//Usuario
router.post('/cadastro', usuario_1.UsuarioController.signUpValidation, usuario_1.UsuarioController.signUp);
router.post('/login', usuario_1.UsuarioController.signInValidation, usuario_1.UsuarioController.signIn);
