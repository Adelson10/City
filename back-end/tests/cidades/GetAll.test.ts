import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - GetAll', () => {
    test('Todas as cidades', async () => {
        const res = await testServer.post('/cidades').send({nome: "Colinas"});
        expect(res.status).toEqual(StatusCodes.CREATED);
    
        const resBuscando = await testServer.get('/cidades').send();
    
        expect(Number(resBuscando.headers['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscando.status).toEqual(StatusCodes.OK);
        expect(resBuscando.body.lenght).toBeGreaterThan(0);
    });
});