import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetById', () => {
    let cidadeId: number | undefined = undefined; 
    beforeAll(async () => {
        const respCidade = await testServer.post('/cidades').send({ nome: "Teste" });
        cidadeId = respCidade.body;
    });

        test('Procurar por id', async () => {
        const res = await testServer.post('/pessoas').send({
            nomeCompleto: "Adelson",
            email: "barros.adelson101@gmail.com",
            cidadeId,
            cep: 66670000
        });
        expect(res.status).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer.get(`/pessoas/${res.body}`).send();
        expect(resBuscada.status).toEqual(StatusCodes.OK);        
        expect(resBuscada.body).toHaveProperty('nomeCompleto');
    });

    test('Procurar uma cidade que não existe', async () => {
        const res = await testServer.get('/pessoas/99999').send();
        expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toHaveProperty('errors.default');
    });
})