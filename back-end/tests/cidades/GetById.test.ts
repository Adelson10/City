import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {
    let accessToken: string = '';

    beforeAll(async () => {
        const email = "barros.adelson103@gmail.com";
    
        await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
        const resp = await testServer.post('/login').send({ email, senha: "123456" });
    
        accessToken = resp.body.accessToken;
    });
    test('Procurar por id', async () => {
        const res = await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome: 'Colinas do Tocantins'});
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get(`/cidades/${res.body}`).set({ authorization: `Bearer ${accessToken}` }).send();
        expect(resBuscada.status).toEqual(StatusCodes.OK);        
        expect(resBuscada.body).toHaveProperty('nome');
    });

    test('Procurar uma cidade que não existe', async () => {
        const res = await testServer.get('/cidades/99999').set({ authorization: `Bearer ${accessToken}` }).send();
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
})