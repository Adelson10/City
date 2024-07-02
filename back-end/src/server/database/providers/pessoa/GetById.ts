import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Ipessoa } from "../../models";

export const GetById = async (id: number): Promise< Ipessoa | Error > => {
    try {
        const result = await Knex(ETableNames.pessoa)
        .select('*')
        .where('id','=',id)
        .first();

        if(result) return result;
        return new Error('Não foi encontrado essa pessoa.');
    } catch (error) {
        console.log(error);
        return new Error('Não foi encontrado essa pessoa.');
    }
}