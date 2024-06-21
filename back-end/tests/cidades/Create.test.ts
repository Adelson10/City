import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Create - Cidade', () => {
    it('Criar Registro', async () => {
        const res1 = await testServer
        .post('/cidades')
        .send({ nome: 'Colinas' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });
});
