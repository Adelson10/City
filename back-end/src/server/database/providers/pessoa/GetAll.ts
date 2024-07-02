import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Ipessoa } from "../../models";

export const GetAll = async (page: number, limit: number, filter: string): Promise<Ipessoa[] | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
        .select('*')
        .where('nomeCompleto','like', `%${filter}%`)
        .offset((page - 1) * limit)
        .limit(limit);
        
        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
}