"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./server/database/knex");
const Server_1 = require("./server/Server");
const startServer = () => {
    Server_1.server.listen(process.env.PORT || 3030, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3030}`);
    });
};
if (process.env.IS_LOCALHOST !== 'true') {
    knex_1.Knex.migrate.latest()
        .then(() => {
        knex_1.Knex.seed.run()
            .then(() => startServer())
            .catch(console.log);
    })
        .catch(console.log);
}
else {
    startServer();
}
