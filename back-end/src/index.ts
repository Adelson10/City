import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT || 3030, () => {
        console.log(`App rodando na porta ${ process.env.PORT || 3030}`);
    });
}

if(process.env.IS_LOCALHOST !== 'true' ) {
    Knex.migrate.latest()
    .then(() => {
        startServer();
    }).catch(console.log);
    } else {
        startServer();
}