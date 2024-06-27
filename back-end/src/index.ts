import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT, () => {
        console.log(`App rodando na porta ${ process.env.PORT || 3030}`);
    });
}
console.log(process.env.IS_LOCALHOST);

if(process.env.IS_LOCALHOST) Knex.migrate.latest()
    .then(() => {
        startServer();
    }).catch(console.log);
    else {
        startServer();
}