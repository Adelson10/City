import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
  let accessToken: string = '';
    
  beforeAll(async () => {
      const email = "barros.adelson103@gmail.com";

      await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
      const resp = await testServer.post('/login').send({ email, senha: "123456" });

      accessToken = resp.body.accessToken;
  });
    test('Apaga registro', async () => {
      const res = await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome:"Colinas do Tocantins"});
      expect(res.statusCode).toEqual(StatusCodes.CREATED);

      const resApagada = await testServer.delete(`/cidades/${res.body}`).set({ authorization: `Bearer ${accessToken}` }).send();
      expect(resApagada.status).toEqual(StatusCodes.NO_CONTENT);
    });
    test('Tenta apagar um registro que não existe', async () => {
      const res = await testServer.delete('/cidades/99999').set({ authorization: `Bearer ${accessToken}` }).send();

      expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty('errors.default');
    })
    
    
});