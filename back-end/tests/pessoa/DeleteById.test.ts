import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
    let cidadeId:number | undefined = undefined; 
    beforeAll( async () => {
        const res = await testServer.post('/cidades').send({nome:"Colinas do Tocantins"});
        cidadeId = res.body;
    });
    
    test('Apaga registro', async () => {
      const res = await testServer.post('/pessoas').send({
        nomeCompleto:"Adelson",
        email: "barros.adelson134@gmail.com",
        cidadeId,
        cep: "11111111"
      });
      expect(res.statusCode).toEqual(StatusCodes.CREATED);
      
      const resApagada = await testServer.delete(`/pessoas/${res.body}`).send();
      expect(resApagada.status).toEqual(StatusCodes.NO_CONTENT);
    });
    test('Tenta apagar um registro que não existe', async () => {
      const res = await testServer.delete('/pessoas/99999').send();

      expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty('errors.default');
    })
    
    
});