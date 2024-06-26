import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICidades } from "../../models";

export const GetById = async (id: number): Promise< ICidades | Error > => {
    try {
        const result = await Knex(ETableNames.cidade)
        .select('*')
        .where('id','=',id)
        .first();
        
        if (result) return result;
        return new Error('Não foi encontrado essa cidade.');
    } catch (error) {
        console.log(error);
        return new Error('Não foi encontrado essa cidade.');
    }
}