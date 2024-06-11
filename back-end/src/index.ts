import { server } from "./server/server";

const port = 8080;

server.listen(port, () => {
    console.log('app rodando');
});