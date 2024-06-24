import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Create - Cidade', () => {
    test('Criar Registro ', async () => {
        const res = await testServer.post('/cidades').send({nome:"Colinas"});
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.statusCode).toEqual('number');
    });

    test('Tentando criar cidade curta', async () => {
        const res = await testServer.post('/cidades').send({nome:"Co"});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    })
    
});
