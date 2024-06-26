import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export const create = async (cidade: Omit<ICidades, 'id'>): Promise< number | Error>  => {
   console.log(cidade);
   
     try {
        const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');

        if (typeof result === 'object') return result.id;
        else if(typeof result === 'number') return result;

        return new Error('Erro ao cadastrar o registro');
     } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
     }
}