import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Update By Id', () => {
    test('Atualizar registro', async () => {
      const res = await testServer.post('/cidades').send({nome: 'Colinas do Tocantins'});
      expect(res.status).toEqual(StatusCodes.CREATED);
      
      const resAtualizada = await testServer.put(`/cidades/${res.body}`).send({ nome: 'Colinas' });
      expect(resAtualizada.status).toEqual(StatusCodes.NO_CONTENT);
    });

    test('Tenta atualizar registro que não existe', async () => {
      const res = await testServer.put('/cidades/99999').send({nome: 'Colinas'});

      expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty('errors.default');
    })
    
});