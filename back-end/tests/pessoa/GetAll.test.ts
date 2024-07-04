import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('GetAll - Pessoas', () => {
    let cidadeId:number | undefined = undefined; 
    beforeAll( async () => {
        const res = await testServer.post('/cidades').send({nome:"Colinas do Tocantins"});
        cidadeId = res.body;
    });
    test('Pessoa - GetAll', async () => {
        const res = await testServer.post('/pessoas').send({
            nomeCompleto:"Adelson",
            email: "barros.adelson134@gmail.com",
            cidadeId,
            cep: "11111111"
        });        
        expect(res.status).toEqual(StatusCodes.CREATED);
        
        const resBuscando = await testServer.get('/pessoas').send();
            
        expect(Number(resBuscando.headers['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscando.status).toEqual(StatusCodes.OK);
        expect(Object.keys(resBuscando.body).length).toBeGreaterThan(0);
    });
});