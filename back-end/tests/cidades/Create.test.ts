import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Create - Cidade', () => {
    let accessToken: string = '';
    
    beforeAll(async () => {
        const email = "barros.adelson103@gmail.com";

        await testServer.post('/cadastro').send({ nome: "Adelson Barros Dos Santos", email, senha: "123456" });
        const resp = await testServer.post('/login').send({ email, senha: "123456" });

        accessToken = resp.body.accessToken;
    });
    
    test('Criar Registro ', async () => {
        const res =  await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome:"Colinas"});
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.statusCode).toEqual('number');
    });

    test('Tentando criar cidade curta', async () => {
        const res =  await testServer.post('/cidades').set({ authorization: `Bearer ${accessToken}` }).send({nome:"Co"});

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors.body.nome');
    })
    
});
