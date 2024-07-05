import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

    describe('SignIn - Usuario', () => {
        beforeAll( async () => {
            const resp = await testServer.post('/cadastro').send({
                nome: "Adelson Barros Dos Santos",
                email: "barros.adelson103@gmail.com",
                senha: "123456"
            });

            const resp2 = await testServer.post('/cadastro').send({
                nome: "Adelson Barros Dos Santos",
                email: "barros.adelson105@gmail.com",
                senha: "123456"
            });
            
            expect(resp.status).toEqual(StatusCodes.CREATED);
            expect(typeof resp.body).toEqual('number');
            
            expect(resp2.status).toEqual(StatusCodes.CREATED);
            expect(typeof resp2.body).toEqual('number');
        });
        
        test('Fazer Login', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson103@gmail.com",
                senha: "123456"
            });

            expect(resp.status).toEqual(StatusCodes.OK);
            expect(typeof resp.body).toEqual('object');
        });

        test('Fazer Login 2', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson105@gmail.com",
                senha: "123456"
            });

            expect(resp.status).toEqual(StatusCodes.OK);
            expect(typeof resp.body).toEqual('object');
        });

        test('Email Errado', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson104@gmail.com",
                senha: "123456"
            });

            expect(resp.status).toEqual(StatusCodes.UNAUTHORIZED);
            expect(resp.body).toHaveProperty('errors.default');
        });

        test('Senha Errado', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson103@gmail.com",
                senha: "1234567"
            });

            expect(resp.status).toEqual(StatusCodes.UNAUTHORIZED);
            expect(resp.body).toHaveProperty('errors.default');
        });

        test('Sem Email', async () => {
            const resp = await testServer.post('/login').send({
                email: "",
                senha: "123456"
            });

            expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(resp.body).toHaveProperty('errors.body.email');
        });

        test('Sem Senha', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson103@gmail.com",
                senha: ""
            });

            expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(resp.body).toHaveProperty('errors.body.senha');
        });

        test('Email curto', async () => {
            const resp = await testServer.post('/login').send({
                email: "bar",
                senha: "123456"
            });

            expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(resp.body).toHaveProperty('errors.body.email');
        });

        test('Senha curta', async () => {
            const resp = await testServer.post('/login').send({
                email: "barros.adelson103@gmail.com",
                senha: "12"
            });

            expect(resp.status).toEqual(StatusCodes.BAD_REQUEST);
            expect(resp.body).toHaveProperty('errors.body.senha');
        });
    });