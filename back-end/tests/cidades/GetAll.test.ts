import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll - Cidades', () => {
    let accessToken: string = '';

    beforeAll(async () => {
        const email = "barros.adelson103@gmail.com";
    
        await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
        const resp = await testServer.post('/login').send({ email, senha: "123456" });
    
        accessToken = resp.body.accessToken;
    });

    test('Cidades - GetAll', async () => {
        const res = await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome: "Colinas"});
        expect(res.status).toEqual(StatusCodes.CREATED);
    
        const resBuscando = await testServer.get('/cidades').set({ authorization: `Bearer ${accessToken}` }).send();
    
        expect(Number(resBuscando.headers['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscando.status).toEqual(StatusCodes.OK);
        expect(Object.keys(resBuscando.body).length).toBeGreaterThan(0);
    });
});