import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import supertest from 'supertest';

describe('Create - Pessoa', () => {
    let cidadeId: number | undefined = undefined; 
    beforeAll(async () => {
        const respCidade = await testServer.post('/cidades').send({ nome: "Teste" });
        cidadeId = respCidade.body;
    });

    test('Criar Registro de Pessoa', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.CREATED);
        expect(typeof resp.body).toEqual('number');
    });

    test('Criar Registro de Pessoa 2', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Camila",
            email: "barros.camila101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.CREATED);
        expect(typeof resp.body).toEqual('number');
    });

    test('Tentar criar registro com email duplicado', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "duplicado",
            email: "barros.adelson103@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.CREATED);
        expect(typeof resp.body).toEqual('number');

        const resp2 = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.adelson103@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resp2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resp2.body).toHaveProperty('errors.default');
    });

    test('Tentar criar registro com nomeCompleto curto', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Ad",
            email: "barros.adelson104@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.nomeCompleto');
    });

    test('Tentar criar registro sem email', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.email');
    });
    test('Tentar criar registro com email invalido', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.ds",
            cidadeId,
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.email');
    });
    test('Tentar criar registro sem cidadeId', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.barros105@gmail.com",
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.cidadeId');
    });
    test('Tentar criar registro com cidadeId invalido', async () => {
        const resp = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.barros105@gmail.com",
            cidadeId: 'TESTE',
            cep: 66670000
        });
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.cidadeId');
    });
    test('Tentar criar registro sem nenhuma propriedade', async () => {
        const resp = await testServer.post('/pessoas').send({});
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.cidadeId');
    });
});