import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
    test('Apaga registro', async () => {
      const res = await testServer.post('/cidades').send({nome:"Colinas do Tocantins"});
      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const resApagada = await testServer.delete(`/cidades/${res.body}`).send();
      expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    test('Tenta apagar um registro que não existe', async () => {
      const res = await testServer.delete('/cidades/99999').send();

      expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty('errors.default');
    })
    
    
});