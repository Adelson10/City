import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {
    let cidadeId: number | undefined = undefined; 
    beforeAll(async () => {
        const respCidade = await testServer.post('/cidades').send({ nome: "Teste" });
        cidadeId = respCidade.body;
    });

    test('Editando por id', async () => {
        const res = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.put(`/pessoas/${res.body}`).send({
            nomeCompleto: "Adelson Barros",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(resBuscada.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test('Tentando atualizar registro que não existe', async () => {
        const res = await testServer.put('/pessoas/99999').send({
            nomeCompleto: "Adelson Barros",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});