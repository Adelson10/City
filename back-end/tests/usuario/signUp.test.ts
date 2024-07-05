import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('SignUp - Usuario', () => {
    test('Criar conta Usuario', async () => {
        const resp = await testServer.post('/cadastro').send({
            nome: "Adelson Barros Dos Santos",
            email: "barros.adelson103@gmail.com",
            senha: "123456"
        });
        
        expect(resp.status).toEqual(StatusCodes.CREATED);
        expect(typeof resp.body).toEqual('number');
    });
    
    test('Criar conta com nome curto', async () => {
        const resp = await testServer.post('/cadastro').send({
            nome: "Ad",
            email: "barros.adelson103@gmail.com",
            senha: "123456"
        });
        
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.nome');
    });

    test('Criar conta com nome curto', async () => {
        const resp1 = await testServer.post('/cadastro').send({
            nome: "Adelson",
            email: "barros.adelson104@gmail.com",
            senha: "123456"
        });
        expect(resp1.status).toEqual(StatusCodes.CREATED);
        expect(typeof resp1.body).toEqual('number');

        const resp2 = await testServer.post('/cadastro').send({
            nome: "Adelson",
            email: "barros.adelson104@gmail.com",
            senha: "123456"
        });
        
        expect(resp2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resp2.body).toHaveProperty('errors.default');
    });

    test('Criar conta com nome curto', async () => {
        const resp = await testServer.post('/cadastro').send({
            nome: "Ad",
            email: "barros.adelson105@gmail.com",
            senha: "12"
        });
        
        expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
        expect(resp.body).toHaveProperty('errors.body.senha');
    });
});