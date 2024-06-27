"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./server/database/knex");
const Server_1 = require("./server/Server");
const startServer = () => {
    Server_1.server.listen(process.env.PORT, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3030}`);
    });
};
console.log(process.env.IS_LOCALHOST);
if (process.env.IS_LOCALHOST !== 'true') {
    knex_1.Knex.migrate.latest()
        .then(() => {
        startServer();
    }).catch(console.log);
}
else {
    startServer();
}
