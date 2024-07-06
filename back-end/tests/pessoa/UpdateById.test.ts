import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {
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

    test('Editando por id', async () => {
        const res = await testServer.post('/pessoas').set({ authorization: `Bearer ${accessToken}` }).send({
            nomeCompleto: "Adelson",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.put(`/pessoas/${res.body}`).set({ authorization: `Bearer ${accessToken}` }).send({
            nomeCompleto: "Adelson Barros",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resBuscada.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test('Tentando atualizar registro que não existe', async () => {
        const res = await await testServer.put('/pessoas/99999').set({ authorization: `Bearer ${accessToken}` }).send({
            nomeCompleto: "Adelson Barros",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});