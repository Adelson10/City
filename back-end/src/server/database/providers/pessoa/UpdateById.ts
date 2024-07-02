import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Ipessoa } from "../../models";

export const UpdateById = async (id:number, pessoa: Omit<Ipessoa, 'id'>): Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.cidade)
        .where('id', '=', pessoa.cidadeId)
        .count<[{ count: number }]>('* as count');

        if(count === 0 ) return new Error('A cidade usada no registro não foi encontrada');

        const result = await Knex(ETableNames.pessoa)
        .update(pessoa)
        .where('id', '=', id);

        if(result>0) return;
        return Error('Não foi possivel atualizar o registro');
    } catch (error) {
        console.log(error);
        return Error('Não foi possivel atualizar o registro');
    }
}