import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {
    let accessToken: string = '';

    beforeAll(async () => {
        const email = "barros.adelson103@gmail.com";
    
        await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
        const resp = await testServer.post('/login').send({ email, senha: "123456" });
    
        accessToken = resp.body.accessToken;
    });

    test('Editando por id', async () => {
        const res = await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome: "Colinas do Tocantins"});
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.put(`/cidades/${res.body}`).set({ authorization: `Bearer ${accessToken}` }).send({nome: 'Colinas'});
        expect(resBuscada.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test('Tentando atualizar registro que não existe', async () => {
        const res = await testServer.put('/cidades/99999').set({ authorization: `Bearer ${accessToken}` }).send({nome: 'Colinas'});
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});