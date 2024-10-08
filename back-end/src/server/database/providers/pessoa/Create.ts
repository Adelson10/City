import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Ipessoa } from "../../models";

export const create = async (pessoa: Omit<Ipessoa, 'id'>): Promise< number | Error > => {
    try {
        const [{ count }] = await Knex(ETableNames.cidade)
        .where('id', '=', pessoa.cidadeId)
        .count<[{ count: number }]>('* as count');

        if(count === 0 ) return new Error('A cidade usada no registro não foi encontrada');

        const [result] = await Knex(ETableNames.pessoa)
        .insert(pessoa)
        .returning('id');

        if(typeof result === 'object') return result.id;
        else if(typeof result === 'number') return result;

        return new Error('Erro ao cadastrar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar o registro');
    }
}