import { ICidades } from '../../models';

declare module 'knex/type/tables' {
    interface Tables{
        cidade: ICidades,
        // pessoa: IPessoa,
        // usuario: IUsuario
    }
}