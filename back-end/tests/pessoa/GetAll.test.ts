import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll - Pessoas', () => {
    let cidadeId: number | undefined = undefined; 
    let accessToken: string = '';
    
    beforeAll(async () => {
        const email = "barros.adelson103@gmail.com";

        await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
        const resp = await testServer.post('/login').send({ email, senha: "123456" });

        accessToken = resp.body.accessToken;
        const respCidade = await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({ nome: "Colinas do Tocantins" });
        cidadeId = respCidade.body;
    });

    test('Pessoa - GetAll', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${accessToken}` }).send({
            nomeCompleto:"Adelson",
            email: "barros.adelson134@gmail.com",
            cidadeId,
            cep: "11111111"
        });        
        expect(res.status).toEqual(StatusCodes.CREATED);
        
        const resBuscando = await testServer.get('/pessoas').set({ authorization: `Bearer ${accessToken}` }).send();
            
        expect(Number(resBuscando.headers['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscando.status).toEqual(StatusCodes.OK);
        expect(Object.keys(resBuscando.body).length).toBeGreaterThan(0);
    });
});