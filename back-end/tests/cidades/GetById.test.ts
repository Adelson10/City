import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - GetById', () => {

    test('Busca registro por id', async () => {
        const res = await testServer.post('/cidades').send({nome: 'Colinas do Tocantins'});
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get(`/cidades/${res.body}`).send();
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('nome');
    })
    

    test('Tentar buscar registro que não existe', async () => {
      const res = await testServer.get('/cidades/99999').send();

      expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty('errors.default');
    });

})