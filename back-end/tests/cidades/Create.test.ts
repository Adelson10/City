import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Create - Cidade', () => {
    test('Criar Registro ', async () => {
        const res = await testServer.post('/cidades').send({nome: "Colinas"});
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
    });
});
