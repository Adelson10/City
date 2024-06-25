import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {
    test('Editando por id', async () => {
        const res = await testServer.post('/cidades').send({nome: "Colinas do Tocantins"});
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.put(`/cidades/${res.body}`).send({nome: 'Colinas'});
        expect(resBuscada.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test('Tentando atualizar registro que não existe', async () => {
        const res = await testServer.put('/cidades/99999').send({nome: 'Colinas'});
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
});