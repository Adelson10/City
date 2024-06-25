import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

test('Cidades - GetAll', async () => {
    const res = await testServer.post('/cidades').send({nome: "Colinas"});
    expect(res.status).toEqual(StatusCodes.CREATED);

    const resBuscando = await testServer.get('/cidades').send();

    expect(Number(resBuscando.headers['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscando.status).toEqual(StatusCodes.OK);
    expect(Object.keys(resBuscando.body).length).toBeGreaterThan(0);
});